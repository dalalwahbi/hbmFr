import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const CheckoutForm = () => {
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [customer, setCustomer] = useState({
        Name: '',
        Email: '',
        Phone: '',
        Address: '',
        City: '',
    });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('authToken');

        if (!token) {
            alert('Vous devez être connecté pour passer une commande.');
            return;
        }

        try {
            const customerResponse = await fetch('http://127.0.0.1:8000/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(customer),
            });

            if (!customerResponse.ok) {
                throw new Error('Failed to create customer');
            }

            const customerData = await customerResponse.json();
            const customerId = customerData.customer.CustomerID;

            const orderData = {
                product_ids: cart.map(item => item.productID),
                quantities: cart.map(item => item.quantity),
                customer_id: customerId,
            };

            const orderResponse = await fetch('http://127.0.0.1:8000/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to create order');
            }

            alert('Commande réussie !');
            localStorage.removeItem('cart');
            navigate('/');

        } catch (error) {
            console.error('Error:', error);
            alert('Erreur lors de la commande');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Récapitulatif de la commande</h1>
            {cart.length > 0 ? (
                <div className="row">
                    <div className="col-md-6">
                        <ul className="list-group mb-4">
                            {cart.map((item, index) => (
                                <li key={index} className="list-group-item">
                                    Produit ID: {item.productID}, Quantité: {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h2>Informations client</h2>
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">Nom</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Name"
                                    placeholder="Nom"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="Email"
                                    placeholder="Email"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Phone" className="form-label">Téléphone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Phone"
                                    placeholder="Téléphone"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Address" className="form-label">Adresse</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Address"
                                    placeholder="Adresse"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="City" className="form-label">Ville</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="City"
                                    placeholder="Ville"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Confirmer la commande</button>
                        </form>
                    </div>
                </div>
            ) : (
                <p className="text-center">Votre panier est vide.</p>
            )}
        </div>
    );
};

export default CheckoutForm;
