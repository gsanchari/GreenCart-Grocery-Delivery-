import React, { useEffect, useState } from 'react';
import { useAppContext } from "../../context/AppContext.jsx";
import toast from 'react-hot-toast';

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const {data} = await axios.post('/api/seller/login', {email, password})

      if (data.success){
        setIsSeller(true)
        navigate('/seller')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <>
        <form onSubmit={onSubmitHandler} className="form-wrapper">
          <div className="form-container">
            <p className="form-title"><span className="highlight">Seller</span>Login</p>

            <div className="form-group">
              <p>Email</p>
              <input onChange={(e)=>setEmail(e.target.value)}  value={email}
                type="email" placeholder="Enter your email" required
                className="input-field"
              />
            </div>

            <div className="form-group">
              <p>Password</p>
              <input onChange={(e)=>setPassword(e.target.value)}  value={password}
                type="password" placeholder="Enet Your Password" required
                className="input-field"
              />
            </div>

            <button type="submit" className="login-button">Login</button>
          </div>
        </form>

        {/* Embedded CSS */}
        <style>{`
          .form-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            font-size: 0.875rem;
            color: #4b5563;
          }

          .form-container {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            margin: auto;
            align-items: flex-start;
            padding: 3rem 2rem;
            min-width: 20rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
          }

          @media (min-width: 640px) {
            .form-container {
              min-width: 22rem;
            }
          }

          .form-title {
            font-size: 1.5rem;
            font-weight: 500;
            margin: auto;
          }

          .highlight {
            color: #4fbf8b;
          }

          .form-group {
            width: 100%;
          }

          .input-field {
            width: 100%;
            padding: 0.5rem;
            margin-top: 0.25rem;
            border: 1px solid #e5e7eb;
            border-radius: 0.375rem;
            outline-color: #4fbf8b;
          }

          .login-button {
            background-color: #4fbf8b;
            color: white;
            width: 100%;
            padding: 0.5rem 0;
            border-radius: 0.375rem;
            cursor: pointer;
            border: none;
          }

          .login-button:hover {
            opacity: 0.95;
          }
        `}</style>
      </>
    )
  );
};

export default SellerLogin;
