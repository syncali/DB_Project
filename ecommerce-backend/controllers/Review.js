const Review = require('../models/Review');

// Create a new review
const createReview = async (req, res) => {
    const { product_id, rating, review_desc } = req.body;
    const user_id = req.user.user_id;
    try {
        const existingReview = await Review.getReviewByUserAndProduct(user_id, product_id);
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this product. Please update your existing review instead.',
            });
        }
        const review = await Review.createReview(user_id, product_id, rating, review_desc);
        res.status(201).json({ success: true, data: review });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to add review', error: err.message });
    }
};

// Get reviews for a product
const getReviewsByProduct = async (req, res) => {
    const { product_id } = req.params;
    try {
        const reviews = await Review.getReviewsByProduct(product_id);
        res.status(200).json({ success: true, data: reviews });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch reviews', error: err.message });
    }
};

// Delete a review (Admin)
const deleteReview = async (req, res) => {
    const { review_id } = req.params;
    try {
        const deletedReview = await Review.deleteReview(review_id);
        if (!deletedReview) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete review', error: err.message });
    }
};

const deleteMyReview = async (req, res) => {
    const { product_id } = req.body;
    try {
        const deletedReview = await Review.deleteMyReview(req.user.user_id,product_id);
        if (!deletedReview) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete review', error: err.message });
    }
};

// Update a review (Admin)
const updateReview = async (req, res) => {
    const { review_id } = req.params;
    const { rating, review_desc } = req.body;
    try {
        const updatedReview = await Review.updateReview(review_id, rating, review_desc);
        if (!updatedReview) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        res.status(200).json({ success: true, data: updatedReview });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update review', error: err.message });
    }
};

const updateMyReview = async (req, res) => {
    const { product_id, rating, review_desc } = req.body;
    try {
        const updatedReview = await Review.updateMyReview(req.user.user_id, product_id, rating, review_desc);
        if (!updatedReview) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        res.status(200).json({ success: true, data: updatedReview });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update review', error: err.message });
    }
};

module.exports = {
    createReview,
    getReviewsByProduct,
    deleteReview,
    deleteMyReview,
    updateReview,
    updateMyReview
};
