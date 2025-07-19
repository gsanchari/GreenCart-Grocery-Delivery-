import React, { useEffect, useState } from 'react';
import '../pagesStylesheet/ProductDetails.css';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCart';

const ProductDetails = () => {
  const { products, navigate, currence, addToCart } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0 && product) {
      let productsCopy = products
        .filter((item) => item.category === product.category && item._id !== product._id)
        .filter(p => p.inStock)
        .slice(0, 10); // allow more for layout flexibility
      setRelatedProducts(productsCopy);
    }
  }, [products, product]);

  useEffect(() => {
    setThumbnail(product?.image[0] || null);
  }, [product]);

  return product && (
    <div className="product-details-container">
      <p className="breadcrumb">
        <Link to={'/'}>Home</Link> / 
        <Link to={"/products"}>Products</Link> / 
        <Link to={`/products/${product.category.toLowerCase()}`}>{product.category}</Link> / 
        <Link className="highlight">{product.name}</Link>
      </p>

      <div className="product-main">
        <div className="image-gallery">
          <div className="thumbnails">
            {product.image.map((image, index) => (
              <div key={index} onClick={() => setThumbnail(image)} className="thumbnail">
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="main-image">
            <img src={thumbnail} alt="Selected product" />
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>

          <div className="rating-section">
            {Array(5).fill('').map((_, i) => (
              <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="star" />
            ))}
            <p className="rating-number">(4)</p>
          </div>

          <div className="price-section">
            <p className="original-price">MRP: {currence}{product.price}</p>
            <p className="offer-price">MRP: {currence}{product.offerPrice}</p>
            <span className="tax-note">(inclusive of all taxes)</span>
          </div>

          <p className="about-title">About Product</p>
          <ul className="description-list">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          <div className="action-buttons">
            <button onClick={() => addToCart(product._id)} className="add-to-cart">Add to Cart</button>
            <button onClick={() => { addToCart(product._id); navigate("/cart"); }} className="buy-now">Buy now</button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className='related-products'>
        <div className='all-related-produts-text'>
          <p>Related Products</p>
          <div className="all-products-underline"></div>
        </div>

        <div className='all-related-products-list'>
          {relatedProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        <button onClick={() => { navigate('/products'); scrollTo(0, 0); }} className='related-products-button'>
          See More
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
