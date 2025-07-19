import React from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post('/api/product/stock', { id, inStock });

      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="product-list-container">
        <div className="product-list-inner">
          <h2 className="title">All Products</h2>
          <div className="table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th className="hide-sm">Selling Price</th>
                  <th>In Stock</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(products) && products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td className="product-info">
                        <div className="product-image">
                          <img src={product.image?.[0]} alt="Product" />
                        </div>
                        <span className="product-name">{product.name}</span>
                      </td>
                      <td>{product.category}</td>
                      <td className="hide-sm">
                        {currency}
                        {product.offerPrice}
                      </td>
                      <td>
                        <label className="toggle-wrapper">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={product.inStock}
                            onChange={() =>
                              toggleStock(product._id, !product.inStock)
                            }
                          />
                          <div className="toggle-bg">
                            <span className="dot"></span>
                          </div>
                        </label>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .product-list-container {
          flex: 1;
          height: 95vh;
          overflow-y: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .product-list-container::-webkit-scrollbar {
          display: none;
        }

        .product-list-inner {
          width: 100%;
          padding: 1rem;
        }

        @media (min-width: 768px) {
          .product-list-inner {
            padding: 2.5rem;
          }
        }

        .title {
          padding-bottom: 1rem;
          font-size: 1.125rem;
          font-weight: 500;
        }

        .table-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 1024px;
          width: 100%;
          background-color: white;
          border: 1px solid rgba(107, 114, 128, 0.2);
          border-radius: 0.375rem;
          overflow: hidden;
        }

        .product-table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .product-table thead {
          background-color: #f9f9f9;
          color: #111827;
          text-align: left;
        }

        .product-table th, .product-table td {
          padding: 0.75rem 1rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .product-table tr {
          border-top: 1px solid rgba(107, 114, 128, 0.2);
        }

        .product-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .product-image {
          border: 1px solid #d1d5db;
          border-radius: 0.25rem;
          overflow: hidden;
          width: 4rem;
          height: auto;
        }

        .product-image img {
          width: 100%;
          height: auto;
        }

        .product-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: none;
        }

        @media (min-width: 640px) {
          .product-name {
            display: inline-block;
            width: 100%;
          }
        }

        .hide-sm {
          display: none;
        }

        @media (min-width: 640px) {
          .hide-sm {
            display: table-cell;
          }
        }

        .toggle-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          color: #111827;
        }

        .toggle-wrapper input:focus + .toggle-bg {
          outline: none;
          box-shadow: 0 0 0 2px #3b82f6;
        }

        .toggle-bg {
          width: 3rem;
          height: 1.75rem;
          background-color: #cbd5e1;
          border-radius: 9999px;
          transition: background-color 0.2s;
          position: relative;
        }

        .toggle-wrapper input:checked + .toggle-bg {
          background-color: #4fbf8b;
        }

        .dot {
          position: absolute;
          left: 0.25rem;
          top: 0.25rem;
          width: 1.25rem;
          height: 1.25rem;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.2s ease-in-out;
        }

        .toggle-wrapper input:checked + .toggle-bg .dot {
          transform: translateX(1.25rem);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </>
  );
};

export default ProductList;
