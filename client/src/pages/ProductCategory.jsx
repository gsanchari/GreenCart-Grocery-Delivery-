import React from 'react'
import '../pagesStylesheet/ProductCategory.css'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCart from '../components/ProductCart';

const ProductCategory = () => {

    const {products} = useAppContext();
    const {category} = useParams();
    const searchCategory = categories.find((item)=>item.path.toLowerCase() === category);
    const filteredProducts = products.filter((product)=> product.category.toLowerCase() === category);

  return (    
    <div className="all-products-container">
      {searchCategory && (
    <>
        <div className="all-products-header">
            <p className="all-products-title">{searchCategory.text.toUpperCase()}</p>
            <div className="all-products-underline"></div>
        </div>
        {filteredProducts.length > 0 ? (
            <div className="all-products-grid">
                {
                  filteredProducts.map((product) => (
                    <ProductCart key={product._id} product={product}/>
                  ))
                }
            </div>
        ): (
            <div className="all-products-not">
                <p>No Products found in this category!!</p>
            </div>
        )}
    </>
)}

    </div>
  )
}

export default ProductCategory
