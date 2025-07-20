import { useEffect, useState } from "react";
import '../pagesStylesheet/Cart.css';
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
    const {
        products,
        currency,
        cartItems,
        removeFromCart,
        getCartCount,
        updateCartItem,
        navigate,
        getCartAmount,
        axios,
        user,
        setCartItems
    } = useAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOption] = useState("COD");

    const getCart = () => {
        let tempArray = [];
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key);
            if (product) {
                product.quantity = cartItems[key];
                tempArray.push(product);
            }
        }
        setCartArray(tempArray);
    };

    const getUserAddress = async () => {
        if (!user || !user._id) return;
        try {
            const { data } = await axios.get(`/api/address/get?userId=${user._id}`);
            console.log("Fetched addresses:", data);

            if (data.success && Array.isArray(data.address)) {
                setAddresses(data.address);
                if (data.address.length > 0) {
                    setSelectedAddress(data.address[0]);
                }
            } else {
                toast.error(data.message || "Failed to fetch address");
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            toast.error(error.message || "Failed to fetch address");
        }
    };

    const placeOrder = async () => {
        try {
            if(!selectedAddress){
                return toast.error("please select an Address")
            }
            //Place Order with COD
            if(paymentOption === "COD"){
                const {data} = await axios.post('/api/order/cod', {
                    userId: user._id,
                    items: cartArray.map(item =>({product: item._id, quantity:item.quantity})),
                    address: selectedAddress._id
                })

                if(data.success){
                    toast.success(data.message)
                    setCartItems({});
                    navigate('/my-orders')
                }else{
                    toast.error(data.message)
                }
            }else{
                //pace order with stripe
                const {data} = await axios.post('/api/order/stripe', {
                    userId: user._id,
                    items: cartArray.map(item =>({product: item._id, quantity:item.quantity})),
                    address: selectedAddress._id
                })

                if(data.success){
                    window.location.replace(data.url)
                }else{
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems]);

    useEffect(() => {
        if (user) {
            getUserAddress();
        }
    }, [user]);

    return products.length > 0 && cartItems ? (
        <div className="cart-container">
            <div className='cart-products-section'>
                <h1 className="cart-title">
                    Shopping Cart <span className="cart-items-count">{getCartCount()} Items</span>
                </h1>

                <div className="cart-columns-header">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="cart-product-row">
                        <div className="product-info-cart">
                            <div onClick={() => {
                                navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                window.scrollTo(0, 0);
                            }} className="product-image-cart">
                                <img className="image" src={product.image?.[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="product-name">{product.name}</p>
                                <div className="product-meta">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='qty-selector'>
                                        <p>Qty:</p>
                                        <select
                                            onChange={e => updateCartItem(product._id, Number(e.target.value))}
                                            value={cartItems[product._id] || 1}
                                            className='qty-dropdown'
                                        >
                                            {Array(Math.max(9, cartItems[product._id])  || 1).fill('').map((_, i) => (
                                                <option key={i} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={() => removeFromCart(product._id)} className="remove-btn">
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                ))}

                <button onClick={() => { navigate("/products"); window.scrollTo(0, 0); }} className="continue-shopping">
                    <i className="ri-arrow-left-line"></i>
                    Continue Shopping
                </button>
            </div>

            <div className="order-summary-section">
                <h2 className="summary-title">Order Summary</h2>
                <hr className="divider" />

                <div className="address-section">
                    <p className="section-title">Delivery Address</p>
                    <div className="address-box">
                        <p className="address-text">
                            {selectedAddress ? (
                                `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                            ) : (
                                "No address found"
                            )}
                        </p>
                        <button onClick={() => setShowAddress(!showAddress)} className="change-address">Change</button>
                        {showAddress && (
                            <div className="dropdown-address">
                                {addresses.map((address, index) => (
                                    <p
                                        key={index}
                                        onClick={() => { setSelectedAddress(address); setShowAddress(false); }}
                                        className="address-option"
                                    >
                                        {address.street}, {address.city}, {address.state}, {address.country}
                                    </p>
                                ))}
                                <p onClick={() => navigate("/add-address")} className="add-address">Add address</p>
                            </div>
                        )}
                    </div>

                    <p className="section-title">Payment Method</p>
                    <select onChange={e => setPaymentOption(e.target.value)} className="payment-select">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="divider" />

                <div className="summary-details">
                    <p className="summary-item">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="summary-item">
                        <span>Shipping Fee</span><span className="free-shipping">Free</span>
                    </p>
                    <p className="summary-item">
                        <span>Tax (2%)</span><span>{currency}{(getCartAmount() * 0.02).toFixed(2)}</span>
                    </p>
                    <p className="summary-total">
                        <span>Total Amount:</span>
                        <span>{currency}{(getCartAmount() * 1.02).toFixed(2)}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="place-order-btn">
                    {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    ) : null;
};

export default Cart;
