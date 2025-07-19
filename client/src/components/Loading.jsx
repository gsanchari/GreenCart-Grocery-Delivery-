import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Loading = () => {
    const {navigate} = useAppContext();
    let{search} = useLocation();
    const query = new URLSearchParams(search)
    const nextUrl = query.get('next');

    useEffect(()=>{
        if(nextUrl){
            setTimeout(() => {
                navigate(`/${nextUrl}`)
            }, 2000);
        }
    }, [nextUrl])

  return (
    <>
      <div className="loading-container">
        <div className="spinner"></div>
      </div>

      <style>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
          background-color: #ffffff;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid transparent;
          border-top: 4px solid #4fbf8b;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Loading;
