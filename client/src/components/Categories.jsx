import React from 'react';
import { assets, categories } from '../assets/assets';
import '../stylesheet/Categories.css';
import { useAppContext } from '../context/AppContext';

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="categories-page">
      <h2>Categories</h2>
      <div className="categories-list">
        {categories.map((category, index) => (
          <div className="categories"
            key={index}
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img src={category.image} alt={category.text} />
            <p>{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
