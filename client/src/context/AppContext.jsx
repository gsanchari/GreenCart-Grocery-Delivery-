import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { dummyProducts } from "../assets/assets";

export const AppContext = createContext();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  // Fetch seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success);
    } catch (error) {
      setIsSeller(false);
    }
  };

  // Fetch user and cart
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      }
    } catch (error) {
      setUser(null);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Function to sync cart with backend
const syncCartWithServer = async (updatedCart) => {
  try {
    const { data } = await axios.post('/api/cart/update', { cartItems: updatedCart });
    if (!data.success) {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Cart sync error: " + error.message);
  }
};


  // ✅ Add to cart
  const addToCart = async (itemId) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to Cart");
    await syncCartWithServer(cartData);
  };

  // ✅ Remove from cart
  const removeFromCart = async (itemId) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      setCartItems(cartData);
      toast.success("Removed from Cart");
      await syncCartWithServer(cartData);
    }
  };

  // ✅ Update item quantity directly
  const updateCartItem = async (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
    await syncCartWithServer(cartData);
  };

  // ✅ Get total item count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  // ✅ Get total cart price
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => p._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.offerPrice * cartItems[itemId];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // Initial data load
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
    
  }, []);

  //update database cart items
  useEffect(()=>{
    const updateCart = async ()=>{
      try {
        const {data} = await axios.post('/api/cart/update', {cartItems});
        if(!data.success){
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    if(user){
      updateCart();
    }
  }, [cartItems])

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    removeFromCart,
    updateCartItem,
    cartItems,
    getCartCount,
    getCartAmount,
    searchQuery,
    setSearchQuery,
    axios,
    fetchProducts,
    setCartItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
