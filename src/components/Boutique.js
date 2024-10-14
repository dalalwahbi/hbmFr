// Boutique.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import axios from 'axios';
import Light from './headers/light';
import Footer from "components/footers/FiveColumnWithInputForm.js";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import '../Boutique.css'; // Adjust the path according to your file structure

const Boutique = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products'); // Change to your API endpoint
                setProducts(response.data);
            } catch (err) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    console.log(products);
    // Filter products by selected category
    const filteredProducts = selectedCategory 
        ? products.filter(product => product.Category === selectedCategory) 
        : products;

    console.log("Products", products);
    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-danger">{error}</div>;

    const viewProductDetails = (productId) => {
        navigate(`/product-details/${productId}`); // Navigate to the product details page
    };

    return (
        <>
            <Light />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Checkout our menu.</h1>

                {/* Category Filter */}
                <div className="text-center mb-4">
                    <button onClick={() => setSelectedCategory('')} className="btn btn-secondary m-1">All</button>
                    <button onClick={() => setSelectedCategory('Cosmétique')} className="btn btn-secondary m-1">Cosmétique</button>
                    <button onClick={() => setSelectedCategory('Produit alimentaire')} className="btn btn-secondary m-1">Produit Alimentaire</button>
                </div>

                <div className="row">
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <div key={product.ProductID} className="product-card">
                                <img 
                                    src={`http://127.0.0.1:8000/storage/${product.image}`} 
                                    alt={product.Name} 
                                    className="product-image" 
                                />
                                <h2 className="product-name">{product.Name}</h2>
                                <p className="product-description">{product.Description}</p>
                                <p className="product-price">${product.Price}</p>
                                <div className="button-container">
                                    {/* <button className="buy-button">Buy Now</button> */}
                                    <button className="view-button" onClick={() => viewProductDetails(product.ProductID)}>
                                        details<FontAwesomeIcon icon={faEye} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Boutique;
