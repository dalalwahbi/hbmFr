import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Update this line
import Footer from "components/footers/FiveColumnWithInputForm.js";
import Light from './headers/light';
// import 'src/ProductDetails.css'; // Import the custom CSS file

const ProductDetails = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]); // State to store related products
    const [quantity, setQuantity] = useState(1); // State to manage quantity
    const [cart, setCart] = useState([]); // State to manage cart
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    // Fetch product details
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

    // Fetch related products
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/same-category-products/${id}`);
                if (!response.ok) {
                    throw new Error("Related products not found");
                }
                const data = await response.json();
                setRelatedProducts(data.products); // Assuming the response contains a list of related products
            } catch (error) {
                console.error("Error fetching related products:", error);
            }
        };

        fetchRelatedProducts();
    }, [id]);

    if (!product) {
        return <div className="loading">Loading...</div>; // Or a loading spinner
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    // Handle adding to cart
    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = existingCart.find(item => item.productID === product.ProductID);
        
        if (productInCart) {
            // Update quantity if the product already exists in the cart
            productInCart.quantity += quantity;
        } else {
            // Add new product to cart
            existingCart.push({
                productID: product.ProductID,
                productName: product.Name,
                productImage:product.image,
                productPrice:product.Price,
                quantity: quantity
            });
        }

        // Save updated cart to local storage
        localStorage.setItem('cart', JSON.stringify(existingCart));
        alert('Produit ajouté au panier');
    };

    const handleCheckout = () => {
        // Redirect to checkout page
        navigate('/checkout');
    };

    const Boutique = () => {
        // Redirect to Boutique page
        navigate('/Boutique');
    };

    return (
        <>
            <Light />

            <div className="product-details">
                <div className="product-image-container">
                    <img src={`http://127.0.0.1:8000/storage/${product.image}`} alt={product.Name} className="product-image" />
                </div>
                <div className="product-info">
                    <h1 className="product-title">{product.Name}</h1>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Price: ${product.Price}</p>
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
                    <br />
                    <button onClick={Boutique} className="add-to-cart-button">Boutique</button>
                    <br/>
                    <button onClick={handleAddToCart} className="add-to-cart-button">Ajouter au panier</button>
                    <br/>
                    <button onClick={handleCheckout} className="checkout-button">Passer à la caisse</button>
                </div>
            </div>

            {/* Display related products */}
            <div className="related-products">
                <h2>Produits similaires</h2>
                <div className="related-products-grid">
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((relatedProduct) => (
                            <div key={relatedProduct.ProductID} className="related-product-card">
                                <Link to={`/product-details/${relatedProduct.id}`}>
                                    <img src={`http://127.0.0.1:8000/storage/${relatedProduct.image}`} alt={relatedProduct.name} className="related-product-image" />
                                    <p className="related-product-name">{relatedProduct.Name}</p>
                                    <p className="related-product-price">Price: ${relatedProduct.Price}</p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>Aucun produit similaire trouvé.</p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProductDetails;
