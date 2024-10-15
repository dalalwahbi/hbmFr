import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEye } from '@fortawesome/free-solid-svg-icons';
import Footer from "components/footers/FiveColumnWithInputForm.js";
import Light from './headers/light';
import { useNavigate } from 'react-router-dom';
const Boutique = () => {
    const [products, setProducts] = useState([]); // State for storing products
    const [cart, setCart] = useState([]); // State for managing the cart
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook
    // Fetch products when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products`);
                if (!response.ok) {
                    throw new Error('Products not found');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Handle "Ajouter au panier" functionality
    const handleAddToCart = (product) => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = existingCart.find(item => item.productID === product.ProductID);
        
        if (productInCart) {
            // If the product already exists in the cart, increase its quantity
            productInCart.quantity += 1;
        } else {
            // Add the product to the cart with an initial quantity of 1
            existingCart.push({
                productID: product.ProductID,
                productName: product.Name,
                productImage: product.image,
                productPrice: product.Price,
                quantity: 1
            });
        }

        // Save updated cart to localStorage and update cart state
        localStorage.setItem('cart', JSON.stringify(existingCart));
        setCart(existingCart);
        alert('Produit ajouté au panier');
    };

    // Filter products based on selected category
    const filteredProducts = selectedCategory 
        ? products.filter(product => product.Category === selectedCategory)
        : products;
    const viewProductDetails = (productId) => {
            navigate(`/product-details/${productId}`); // Navigate to the product details page
        };
    return (
        <div>
            <Light />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Checkout our menu.</h1>

                {/* Category Filter */}
                <div className="text-center mb-4">
                    <button onClick={() => setSelectedCategory('')} className="btn m-1">All</button>
                    <button onClick={() => setSelectedCategory('Cosmétique')} className="btn m-1">Cosmétique</button>
                    <button onClick={() => setSelectedCategory('Produit alimentaire')} className="btn m-1">Produit Alimentaire</button>
                </div>

                <div className="row">
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <div key={product.ProductID} className="product-card">
                                <img 
                                    src={`${process.env.REACT_APP_API_URL}/storage/${product.image}`} 
                                    alt={product.Name} 
                                    className="product-image" 
                                />
                                <h2 className="product-name">{product.Name}</h2>
                                <p className="product-description">{product.description}</p>
                                <p className="product-price">${product.Price}</p>
                                <div className="button-container">
                           

                                    {/* Ajouter au Panier Button */}
                                    <button className="cart-button btn" onClick={() => handleAddToCart(product)}>
    Ajouter au panier <FontAwesomeIcon icon={faShoppingCart} />
</button>
                                             {/* View Details Button */}
                                             <button className="view-button btn" onClick={() => viewProductDetails(product.ProductID)}>
                                         <FontAwesomeIcon icon={faEye} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Boutique;
