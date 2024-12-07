const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validator = require('validator');
const speakeasy = require('speakeasy'); 
const {sendMFACodeToEmail} = require('../middleware/mails');
const { createUser, getUserbyEmail } = require("../models/auth");
const {blacklistToken} = require("../models/Token");

const register = async (req, res) => {
    try{
        const { first_name, last_name, role, email, password} = req.body;
        if (!['admin', 'customer', 'delivery-partners'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role. Choose "admin" or "customer" or "delivery-partners".' });
        }
        if (!validator.isStrongPassword(password, { minLength: 8, minSymbols: 1 })) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and include at least one symbol.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(first_name, last_name, role, email, hashedPassword);
        res.status(201).json({success: true, data:{user:newUser} });
    }
    catch(err){
        res.status(500).json({success: false, message: err });
    }
}

const login = async (req, res) => {
    try{
        const { email, password , mfa_code } = req.body;
        const userResult = await getUserbyEmail(email);
        if (userResult.rows.length === 0 ) return res.status(400).json({ message: 'User not found' });

        const user = userResult.rows[0];

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(403).json({ message: 'Invalid credentials' });

        if (user.role === 'admin') {
            if (!mfa_code) {
                // Generate an MFA code
                const token = speakeasy.totp({
                    secret: process.env.MFA_SECRET,
                    encoding: 'base32'
                });

                // Send the MFA code via email (setup required for nodemailer)
                await sendMFACodeToEmail(user.email, token);

                return res.status(206).json({ message: 'MFA code sent to your email.' });
            }

            // Verify MFA code
            const isValidMFA = speakeasy.totp.verify({
                secret: process.env.MFA_SECRET,
                encoding: 'base32',
                token: mfa_code,
                window: 1
            });

            if (!isValidMFA) return res.status(403).json({ message: 'Invalid MFA code' });
        }

        const accessToken = jwt.sign({ user_id: user.user_id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
        
        const refreshToken =  jwt.sign({ user_id: user.user_id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        res.status(200).json({ success: true, message: "Login successful",accessToken, refreshToken });
    }
    catch(err){
        res.status(500).json({success: false, message: err });
    }
}

const logout = async (req, res) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided." });
        }

        // Decode the token without verifying to extract payload
        const decodedToken = jwt.decode(token);

        if (!decodedToken) {
            return res.status(401).json({ success: false, message: "Invalid token." });
        }

        // Add the token to the blacklist with its expiry time
        await blacklistToken(token, decodedToken.exp);

        return res.status(200).json({
            success: true,
            message: "Logged out successfully. Token invalidated.",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during logout.",
            error: err.message,
        });
    }
};

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: "Refresh token required." });
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        
        // Generate a new access token
        const newAccessToken = jwt.sign(
            { user_id: decoded.user_id, email: decoded.email, role: decoded.role },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.json({
            success: true,
            accessToken: newAccessToken,
        });
    } catch (err) {
        res.status(403).json({ success: false, message: "Invalid refresh token", error: err.message });
    }
};

module.exports = {register, login, logout, refreshToken};