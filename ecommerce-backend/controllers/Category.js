const Category = require("../models/Category.js");
const { validationResult } = require('express-validator');

const createCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const category = await Category.create(req.body);
        res.status(201).json({ success: true, data: category });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json({ success: true, data: category });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json({ success: true, data: categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const updateCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const category = await Category.update(req.params.id, req.body);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json({ success: true, data: category });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.delete(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json({ success: true, message: 'Category Deleted Successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {createCategory, getCategory, getCategories, updateCategory, deleteCategory};