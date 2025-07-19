import React, { useState } from 'react';
import  { assets,categories } from "../../assets/assets"
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  const {axios} = useAppContext();

  const onSubmitHandler = async (event)=>{
    try {
      event.preventDefault();

      const productData ={
        name,
        description: description.split('\n'),
        category,
        price,
        offerPrice
      }

      const formData = new FormData();
      formData.append('productData', JSON.stringify(productData));
      for(let i=0; i< files.length; i++){
        formData.append('images', files[i])
      }

      const {data} = await axios.post ('/api/product/add', formData)

      if(data.success){
        toast.success(data.message);
        setName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setOfferPrice('');
        setFiles([])
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="add-product-container">
        <form onSubmit={onSubmitHandler} className="add-product-form">
          <div>
            <p className="label">Product Image</p>
            <div className="image-upload-area">
              {Array(4).fill('').map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input onChange={(e)=>{
                        const updatedFiles = [...files];
                        updatedFiles[index] =e.target.files[0]
                        setFiles(updatedFiles)
                      }}  accept="image/*" type="file" id={`image${index}`} hidden />
                  <img
                    className="upload-preview"
                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="product-name" className="label">Product Name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name}
              id="product-name"
              type="text"
              placeholder="Type here"
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-description" className="label">Product Description</label>
            <textarea
              id="product-description"
              rows={4}
              placeholder="Type here"
              className="input-field textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="category" className="label">Category</label>
            <select
              id="category"
              className="input-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
                {categories.map((item, index)=>(
                  <option key={index} value={item.path}>{item.path}</option>
                ))}
            </select>
          </div>

          <div className="price-fields">
            <div className="form-group small">
              <label htmlFor="product-price" className="label">Product Price</label>
              <input
                id="product-price"
                type="number"
                placeholder="0"
                className="input-field"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="form-group small">
              <label htmlFor="offer-price" className="label">Offer Price</label>
              <input
                id="offer-price"
                type="number"
                placeholder="0"
                className="input-field"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">ADD</button>
        </form>
      </div>

      <style>{`
  .add-product-container {
    flex: 1;
    height: 85vh;
    overflow-y: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .add-product-form {
    padding: 1rem;
    max-width: 520px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .add-product-form {
      padding: 2rem;
    }
  }

  .label {
    font-size: 0.95rem;
    font-weight: 500;
  }

  .image-upload-area {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.4rem;
    align-items: center;
  }

  .upload-preview {
    max-width: 5rem;
    cursor: pointer;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .input-field {
    padding: 0.45rem 0.65rem;
    border-radius: 0.375rem;
    border: 1px solid rgba(107, 114, 128, 0.4);
    outline: none;
    font-size: 0.9rem;
  }

  @media (min-width: 768px) {
    .input-field {
      padding: 0.55rem 0.75rem;
    }
  }

  .textarea {
    resize: none;
  }

  .price-fields {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    align-items: flex-start;
  }

  .form-group.small {
    flex: 1;
    min-width: 7rem;
  }

  .submit-button {
    padding: 0.5rem 1.25rem;
    background-color: #4fbf8b;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    font-size: 0.95rem;
    cursor: pointer;
    width: 100px;
    align-self: flex-start;
  }

  .submit-button:hover {
    background-color: #c6f2e9;
    color: black;
  }
`}</style>
    </>
  );
};

export default AddProduct;
