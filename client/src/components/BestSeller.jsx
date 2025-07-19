import React from 'react';
import { useAppContext } from '../context/AppContext';
import '../stylesheet/BestSeller.css';
import ProductCart from './ProductCart';  // ✅ Import matches filename

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className='best-seller'>
      <h2>Best Sellers</h2>
      <div className="bestSeller-list">

        {products.filter((product)=> product.inStock).slice(0,10).map((product, index)=>(

          products.length > 0 ? (
            <ProductCart key={index} product={product} />
          ) : (
            <p>Loading products...</p>
          )

        ))}
        
      </div>
    </div>
  );
};

export default BestSeller;





