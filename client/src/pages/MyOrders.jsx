import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import '../pagesStylesheet/MyOrders.css';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get(`/api/order/user?userId=${user._id}`);
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Error loading orders");
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="my-orders-container">
      <div className="orders-header">
        <p className="orders-title">My Orders</p>
        <div className="orders-underline"></div>
      </div>

      {myOrders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        myOrders.map((order, index) => (
          <div key={index} className="order-card">
            <p className="order-info">
              <span>Order ID: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span>Total Amount: {currency}{order.amount}</span>
            </p>

            {order.items.map((item, idx) => (
              <div
                key={idx}
                className={`order-item ${order.items.length !== idx + 1 ? 'with-border' : ''}`}
              >
                <div className="item-details">
                  <div className="item-image-wrapper">
                    <img
                      src={item.product?.image?.[0] || "/placeholder.jpg"}
                      alt={item.product?.name || "Product"}
                      className="item-image"
                    />
                  </div>
                  <div className="item-info">
                    <h2 className="item-name">{item.product?.name}</h2>
                    <p>Category: {item.product?.category}</p>
                  </div>
                </div>

                <div className="item-meta">
                  <p>Quantity: {item.quantity || "1"}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <p className="item-amount">
                  Amount: {currency}{(item.product?.offerPrice || 0) * item.quantity}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
