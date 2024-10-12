// ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // State to manage quantity

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error("Product not found");
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (!product) {
        return <div className="loading">Loading...</div>; // Or a loading spinner
    }
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };
    return (
        <div className="product-details">
            <div className="product-image-container">
                <img src={`http://127.0.0.1:8000/storage/${product.image}`} alt={product.Name} className="product-image" />
            </div>
            <div className="product-info">
                <h1 className="product-title">{product.Name}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: ${product.Price}</p>
                           {/* Input for selecting quantity */}
                <div className="quantity-selector">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        min="1"
                        onChange={handleQuantityChange}
                        className="quantity-input"
                    />
                </div>
                <br/>
                <br/>
                <Link to="/" className="back-button">Ajouter au panier</Link>
            </div>
        </div>
    );
};

export default ProductDetails;
