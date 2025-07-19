// AddAddress.jsx
import React, { useEffect } from 'react';
import '../pagesStylesheet/AddAddress.css';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="custom-input"
    type={type}
    placeholder={placeholder}
    name={name}
    value={address[name]}
    onChange={handleChange}
    required
  />
);

const AddAddress = () => {

  const {axios, user, navigate} = useAppContext();
  const [address, setAddress] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setAddress((prevAddress) =>({
      ...prevAddress,
      [name] :value,
    }))
    console.log(address);
  };

  const onSubmitHandler = async (e) => {
  e.preventDefault(); // ✅ Prevent form reload
  try {
    const { data } = await axios.post('/api/address/add', {
      address,
      userId: user._id, // ✅ Send user ID with request
    });

    if (data.success) {
      toast.success(data.message);
      navigate('/cart');
    } else {
      toast.error(data.message || "Something went wrong");
    }
  } catch (error) {
    toast.error(error.message || "Failed to add address");
  }
};

  useEffect(()=>{
    if(!user){
      navigate('/cart')
    }
  }, [])

  return (
    <div className="add-address-container">
      <p className="add-address-title">
        Add Shipping <span className="highlight">Address</span>
      </p>

      <div className="add-address-body">
        <div className="form-container">
          <form onSubmit={onSubmitHandler}>
            <div className="input-row">
              <InputField type="text" placeholder="First Name" name="firstName" address={address} handleChange={handleChange} />
              <InputField type="text" placeholder="Last Name" name="lastName" address={address} handleChange={handleChange} />
            </div>

            <div className="input-single">
              <InputField type="email" placeholder="Email Address" name="email" address={address} handleChange={handleChange} />
            </div>

            <div className="input-single">
              <InputField type="text" placeholder="Street" name="street" address={address} handleChange={handleChange} />
            </div>

            <div className="input-row">
              <InputField type="text" placeholder="City" name="city" address={address} handleChange={handleChange} />
              <InputField type="text" placeholder="State" name="state" address={address} handleChange={handleChange} />
            </div>

            <div className="input-row">
              <InputField type="number" placeholder="Zip Code" name="zipcode" address={address} handleChange={handleChange} />
              <InputField type="text" placeholder="Country" name="country" address={address} handleChange={handleChange} />
            </div>

            <div className="input-single">
              <InputField type="text" placeholder="Phone Number" name="phone" address={address} handleChange={handleChange} />
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>

        <img className="add-address-image" src="/add_address_image.svg" alt="add-address" />
      </div>
    </div>
  );
};

export default AddAddress;
