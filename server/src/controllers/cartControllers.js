import User from "../models/User.js";

// Update User Cart: POST /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Comes from auth middleware
    const { cartItems } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing user ID",
      });
    }

    // Update cart
    await User.findByIdAndUpdate(userId, {
      cartItems: cartItems || {},
    });

    res.status(200).json({
      success: true,
      message: "Cart Updated",
    });
  } catch (error) {
    console.error("Cart update error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
