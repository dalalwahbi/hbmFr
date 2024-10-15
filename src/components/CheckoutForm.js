import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Light from './headers/light';

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
        console.log("cart", storedCart);
    }, []);

    // Handle customer input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev, [name]: value }));
    };

    // Handle item deletion from the cart
    const handleDeleteItem = (productID) => {
        const updatedCart = cart.filter(item => item.productID !== productID);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            alert('Vous devez être connecté pour passer une commande.');
            return;
        }

        try {
            // Step 1: Create the customer
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

            // Step 2: Create the order using the returned CustomerID
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

            // Clear the cart after successful order
            localStorage.removeItem('cart');
            navigate('/Boutique');

        } catch (error) {
            console.error('Error:', error);
            alert('Erreur lors de la commande');
        }
    };

    return (
        <div>
            <Light />
        <div className="container">
            <div className="row">
                <div className="col-xl-8">
                    <div className="card border shadow-none">
                        <div className="card-body">
                            <h1>Récapitulatif de la commande</h1>
                            {cart.length > 0 ? (
                                <div>
                                    <ul className="list-group">
                                        {cart.map((item, index) => (
                                            <li className="list-group-item" key={index}>
                                                <div className="d-flex align-items-start border-bottom pb-3">
                                                    <div className="me-4">
                                                        <img src={`http://127.0.0.1:8000/storage/${item.productImage}`} alt="" className="avatar-lg rounded" />
                                                    </div>
                                                    <div className="flex-grow-1 align-self-center overflow-hidden">
                                                        <h5 className="text-truncate font-size-18 text-dark">{item.productName}</h5>
                                                        <p className="text-muted mb-0">Prix: <strong>${item.productPrice}</strong></p>
                                                        <p className="mb-0">Quantité: <strong>{item.quantity}</strong></p>
                                                        <p className="mb-0">Total: <strong>${(item.productPrice * item.quantity).toFixed(2)}</strong></p>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-2">
                                                        <ul className="list-inline mb-0 font-size-16">
                                                            <li className="list-inline-item">
                                                                <a 
                                                                    href="#" 
                                                                    className="text-muted px-1" 
                                                                    onClick={() => handleDeleteItem(item.productID)} // Delete item
                                                                >
                                                                    <i className="mdi mdi-trash-can-outline"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <br/><br/>
                                    <h2>Informations client</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <input type="text" name="Name" placeholder="Nom" className="form-control" onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" name="Email" placeholder="Email" className="form-control" onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" name="Phone" placeholder="Téléphone" className="form-control" onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" name="Address" placeholder="Adresse" className="form-control" onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" name="City" placeholder="Ville" className="form-control" onChange={handleInputChange} required />
                                        </div>
                                        <button type="submit" className="btn btn-success">Confirmer la commande</button>
                                    </form>
                                </div>
                            ) : (
                                <p>Votre panier est vide.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-xl-4">
                    <div className="mt-5 mt-lg-0">
                        <div className="card border shadow-none">
                            <div className="card-header bg-transparent border-bottom py-3 px-4">
                                <h5 className="font-size-16 mb-0">Résumé de la commande</h5>
                            </div>
                            <div className="card-body p-4 pt-2">
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <tbody>
                                            {/* Calculate subtotal */}
                                            <tr>
                                                <td>Sous-total :</td>
                                                <td className="text-end">
                                                    ${cart.reduce((total, item) => total + (item.productPrice * item.quantity), 0).toFixed(2)}
                                                </td>
                                            </tr>
                                            {/* Define the discount amount */}
                                            <tr>
                                                <td>Remise :</td>
                                                <td className="text-end">- $15.00</td>
                                            </tr>
                                            {/* Uncomment if you want to include shipping costs */}
                                            {/* <tr>
                                                <td>Frais de port :</td>
                                                <td className="text-end">$0.00</td>
                                            </tr> */}
                                            {/* Uncomment if you want to include estimated tax */}
                                            {/* <tr>
                                                <td>Taxe estimée :</td>
                                                <td className="text-end">$0.00</td>
                                            </tr> */}
                                            {/* Calculate total */}
                                            <tr className="bg-light">
                                                <th>Total :</th>
                                                <td className="text-end">
                                                    <span className="fw-bold">
                                                        {
                                                            // Subtract the discount from the subtotal
                                                            (cart.reduce((total, item) => total + (item.productPrice * item.quantity), 0) - 15.00).toFixed(2)
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* end table-responsive */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end row */}
        </div>
        </div>
    
    );
};

export default CheckoutForm;
