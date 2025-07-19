import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCart from '../components/ProductCart';
import '../pagesStylesheet/AllProducts.css';

const AllProducts = () => {
    const { products, searchQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(
                products.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredProducts(products);
        }
    }, [products, searchQuery]);

    return (
        <div className="all-products-container">
            <div className="all-products-header">
                <p className="all-products-title">All Products</p>
                <div className="all-products-underline"></div>
            </div>

            <div className="all-products-grid">
                {filteredProducts
                    .filter(product => product.inStock)
                    .map((product, index) => (
                        <ProductCart key={index} product={product} />
                    ))
                }
            </div>
        </div>
    );
};

export default AllProducts;
