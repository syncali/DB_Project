import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Alert } from "@mui/material";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";
import ProductCard from "./ProductCard";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState("featured");

  const categoryMapping = {
    laptops: 1,
    storage: 2,
    monitors: 3,
    processors: 4,
    cases: 5,
    ram: 6,
    gpus: 7,
    motherboards: 8,
    desktops: 9,
    keyboards: 10
  };

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const categoryId = categoryMapping[category];
        
        // Fetch category data for brands
        const catData = await categoryService.getCategoryById(categoryId);
        setCategoryData(catData);

        // Fetch products with filters
        const params = {
          category_id: categoryId,
          min_price: priceRange[0],
          max_price: priceRange[1],
          brand: selectedBrands.length > 0 ? selectedBrands.join(',') : undefined,
          sort: sortBy
        };

        const productsData = await productService.getAllProducts(params);
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [category, selectedBrands, priceRange, sortBy]);

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => {
      // If brand is already selected, remove it
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      }
      // If brand is not selected, add it
      return [...prev, brand];
    });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="category-page">
      <div className="category-banner">
        <h1>{categoryData?.name}</h1>
        <p>{categoryData?.description}</p>
      </div>

      <div className="filters-section">
        <h3>Brands</h3>
        {categoryData?.brands.map(brand => (
          <label key={brand}>
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
            {brand}
          </label>
        ))}
      </div>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id}
            {...product}
            image={product.images[0]?.url}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
