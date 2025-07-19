import React from 'react';
import '../stylesheet/ProductCart.css';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const ProductCart = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  // Safety check: if product is not passed, return null
  if (!product) return null;

  return (
    <div
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        scrollTo(0, 0);
      }}
      className="product-cart"
    >
      <div className="product-image-container">
        <img className="product-image" src={product.image?.[0]} alt={product.name || "Product"} />
      </div>
      <div className="product-category">{product.category}</div>
      <p className="product-name">{product.name}</p>
      <div className="product-rating">
        {Array(5)
          .fill('')
          .map((_, i) => (
            <img
              key={i}
              className="product-rating-img"
              src={i < 4 ? assets.star_icon : assets.star_dull_icon}
              alt="rating"
            />
          ))}
        <p>(4)</p>
      </div>
      <div className="product-price-container">
        <p className="product-price">
          {currency}
          {product.offerPrice}{' '}
          <span className="product-price-original">
            {currency}
            {product.price}
          </span>
        </p>

        <div
          onClick={(e) => {
            e.stopPropagation(); // prevent navigating when adjusting cart
          }}
          className="text-indigo-500"
        >
          {!cartItems?.[product._id] ? (
            <button className="add-button" onClick={() => addToCart(product._id)}>
              <i className="ri-shopping-cart-2-line"></i> Add
            </button>
          ) : (
            <div className="quantity-selector">
              <button
                onClick={() => removeFromCart(product._id)}
                className="quantity-button"
              >
                -
              </button>
              <span className="w-5 text-center">
                {cartItems?.[product._id] || 0}
              </span>
              <button
                onClick={() => addToCart(product._id)}
                className="quantity-button"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
