// Boutique.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Light from './headers/light';
const Boutique = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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
    console.log("Products",products);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    const viewProductDetails = (productId) => {
        navigate(`/product-details/${productId}`); // Navigate to the product details page
    };
    return (
        <>
        <Light />
              <div className="boutique-container">
            <h1 className="boutique-title">Checkout our menu.</h1>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.ProductID} className="product-card">
                        <img src={`http://127.0.0.1:8000/storage/${product.image}`}  alt={product.Name} className="product-image" />
                        <h2 className="product-name">{product.Name}</h2>
                        <p className="product-description">{product.Description}</p>
                        <p className="product-price">${product.Price}</p>
                        <div className="button-container">
                            <button className="buy-button">Buy Now</button>
                            <button className="view-button" onClick={() => viewProductDetails(product.ProductID)}>
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                        </div>                    </div>
                ))}
            </div>
        </div></>
  
    );
};

export default Boutique;
