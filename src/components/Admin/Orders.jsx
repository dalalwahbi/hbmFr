import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import Light from 'components/headers/light';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const fetchAllOrders = async () => {
        try {
            const token = localStorage.getItem('authToken');
            console.log("token",token);
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            const response = await axios.get('http://127.0.0.1:8000/api/get-ordersAdmin', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const data = response.data;
                setOrders(data); 
                console.log(data);
            } else {
                console.error('Failed to fetch orders:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <>
            <Light />

            <div className="d-flex">
            {/* <Sidebar active="orders" /> */}
            <section className="w-100 p-3">
                <div className="d-flex justify-content-start align-items-center gap-2">
                    <svg className="bi bi-person-fill text-primary" width="36" height="36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 14s-1 0-1-1 1-4 5-4 5 4 5 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    <h1 className="text-dark display-4">Orders</h1>
                </div>
                <hr className="my-4" />

                <table className="table table-striped table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th>Order ID</th>
                            <th>Product Names</th>
                            <th>Status</th>
                            <th>Payment Status</th>
                            <th>Total</th>
                            {/* <th>ACTION</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.productNames.join(', ')}</td>
                                <td>{order.status}</td>
                                <td>{order.paymentStatus}</td>
                                <td>{order.total.toFixed(2)}</td>
                                {/* <td>
                                    <button className="btn btn-danger">BAN</button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
        </>
    );
};

export default Orders;
