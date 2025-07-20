import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets, dummyOrders } from '../../assets/assets';
import toast from 'react-hot-toast';

const Orders = () => {
  const { currency,axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const {data} = await axios.get('/api/order/seller');
      if(data.success){
        setOrders(data.orders)
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="orders-container">
        <div className="orders-wrapper">
          <h2 className="orders-title">Orders List</h2>
          {orders.map((order, index) => (
            <div key={index} className="order-row">
              {/* Product Info */}
              <div className="order-section product-info">
                <img className="box-icon" src={assets.box_icon} alt="boxIcon" />
                <div>
                  {order.items.map((item, idx) => (
                    <p key={idx} className="order-product-name">
                      {item.product?.name || '[Deleted Product]'}{' '}
                      <span className="order-quantity">x {item.quantity}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="order-section address-info">
                <p className="order-customer-name">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city}, {order.address.state},{' '}
                  {order.address.zipcode}, {order.address.country}
                </p>
                <p>{order.address.phone}</p>
              </div>

              {/* Amount */}
              <div className="order-section amount">
                <p className="order-amount">{currency}{order.amount}</p>
              </div>

              {/* Payment Info */}
              <div className="order-section payment-info">
                <p>Method: {order.paymentType}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Payment: {order.isPaid ? 'Paid' : 'Pending'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .orders-container {
          flex: 1;
          height: 95vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .orders-container::-webkit-scrollbar {
          display: none;
        }

        .orders-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .orders-wrapper {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .orders-wrapper {
            padding: 2.5rem;
          }
        }

        .orders-title {
          font-size: 1.125rem;
          font-weight: 500;
        }

        .order-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background-color: #fff;
          gap: 1rem;
        }

        .order-section {
          flex: 1 1 200px;
          min-width: 180px;
        }

        .product-info {
          display: flex;
          gap: 0.75rem;
        }

        .box-icon {
          width: 3rem;
          height: 3rem;
          object-fit: cover;
        }

        .order-product-name {
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .order-quantity {
          color: #4fbf8b;
        }

        .order-customer-name {
          color: rgba(0, 0, 0, 0.85);
          font-weight: 500;
        }

        .address-info,
        .payment-info {
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.6);
        }

        .order-amount {
          font-weight: 600;
          font-size: 1.1rem;
          color: #111827;
        }

        @media (max-width: 768px) {
          .order-row {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default Orders;
