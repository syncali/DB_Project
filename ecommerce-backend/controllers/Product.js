const Product = require('../models/Product');
const { validationResult } = require('express-validator');
const fs = require('fs');
const csvParser = require('csv-parser');

const createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.product_id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll(req.query);
        res.json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const searchProducts = async (req, res) => {
    const { keyword } = req.query;
    try {
        const products = await Product.searchByKeyword(keyword);

        res.status(200).json({
            success: true,
            products,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to search products',
            error: err.message,
        });
    }
};

const filterProducts = async (req, res) => {
    const { category_id, min_price, max_price, availability } = req.query;

    try {
        const products = await Product.filterProducts({ category_id, min_price, max_price, availability });

        res.status(200).json({
            success: true,
            products,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to filter products',
            error: err.message,
        });
    }
};

const updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const product = await Product.update(req.params.id, req.body);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.delete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ success: true, message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Add an image to a product
const addProductImage = async (req, res) => {
    const { product_id, image_url } = req.body;
    try {
        if (!product_id || !image_url) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid product ID and image URL',
            });
        }
        const image = await Product.addProductImage(product_id, image_url);
        res.status(201).json({ success: true, data: image });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to add product image', error: err.message });
    }
};

const addProductImages = async (req, res) => { //Bulk
    const { product_id, image_urls } = req.body; // `image_urls` as an array and `product_id` as a single value

    if (!product_id || !Array.isArray(image_urls) || image_urls.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid product ID and a non-empty array of image URLs',
        });
    }

    const images = image_urls.map((url) => ({
        product_id,
        image_url: url,
    }));

    try {
        const insertedImages = await Product.bulkInsertProductImages(images);

        res.status(201).json({
            success: true,
            data: insertedImages,
            message: 'Product images added successfully',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to add product images',
            error: err.message,
        });
    }
};
// Get all images for a product
const getProductImages = async (req, res) => {
    const { product_id } = req.params;
    try {
        const images = await Product.getProductImages(product_id);
        res.status(200).json({ success: true, data: images });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch product images', error: err.message });
    }
};

// Update a product image
const updateProductImage = async (req, res) => {
    const { image_id } = req.params;
    const { image_url } = req.body;
    try {
        const updatedImage = await Product.updateProductImage(image_id, image_url);
        if (!updatedImage) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }
        res.status(200).json({ success: true, data: updatedImage });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update product image', error: err.message });
    }
};

// Delete a product image
const deleteProductImage = async (req, res) => {
    const { image_id } = req.params;
    try {
        const deletedImage = await Product.deleteProductImage(image_id);
        if (!deletedImage) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }
        res.status(200).json({ success: true, message: 'Image deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete product image', error: err.message });
    }
};

const bulkAddProductsFromCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded. Please upload a CSV file.',
            });
        }

        const products = [];
        const productImages = []; // Array to store product image mappings
        // Parse CSV file
        fs.createReadStream(req.file.path)
            .pipe(csvParser())
            .on('data', (row) => {
                const product = {
                    category_id: parseInt(row.category_id, 10),
                    product_name: row.product_name,
                    product_price: parseFloat(row.product_price),
                    stock_quantity: parseInt(row.stock_quantity, 10),
                    product_desc: row.product_desc,
                };

                // Validate product fields
                const errors = validationResult(product);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                // Prepare image data if image URLs are provided
                if (row.image_urls) {
                    const imageUrls = row.image_urls.split(',').map((url) => url.trim());
                    imageUrls.forEach((url) => {
                        productImages.push({ image_url: url, product_name: product.product_name });
                    });
                }

                products.push(product);
            })
            .on('end', async () => {
                try {
                    // Insert products
                    const addedProducts = await Product.bulkInsertProducts(products);

                    // Map product IDs to image URLs
                    const imagesToInsert = [];
                    for (const image of productImages) {
                        const product = addedProducts.find(
                            (p) => p.product_name === image.product_name
                        );
                        if (product) {
                            imagesToInsert.push({
                                product_id: product.product_id,
                                image_url: image.image_url,
                            });
                        }
                    }

                    // Insert product images if any
                    if (imagesToInsert.length > 0) {
                        await Product.bulkInsertProductImages(imagesToInsert);
                    }

                    res.status(200).json({
                        success: true,
                        message: 'Products and images added successfully from CSV.',
                        data: { addedProducts, images: imagesToInsert },
                    });

                    // Cleanup the uploaded file
                    fs.unlinkSync(req.file.path);
                } catch (err) {
                    res.status(500).json({
                        success: false,
                        message: 'Failed to add products or images from CSV.',
                        error: err.message,
                    });
                }
            });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'An error occurred during file processing.',
            error: err.message,
        });
    }
};


module.exports = {
    createProduct,
    getProduct, 
    getProducts, 
    searchProducts, 
    filterProducts, 
    updateProduct, 
    deleteProduct,
    addProductImage,
    addProductImages,
    getProductImages,
    updateProductImage,
    deleteProductImage,
    bulkAddProductsFromCSV
};