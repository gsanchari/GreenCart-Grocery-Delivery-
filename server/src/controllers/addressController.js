import Address from "../models/Address.js";

// Add address: POST /api/address/add
export const addAddress = async (req, res) => {
    try {
        const { address, userId } = req.body;
        if (!userId || !address) {
            return res.json({ success: false, message: "Missing userId or address" });
        }

        await Address.create({ ...address, userId });

        res.json({
            success: true,
            message: "Address added successfully"
        });

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// Get address: GET /api/address/get?userId=...
export const getAddress = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.json({
                success: false,
                message: "User ID not provided"
            });
        }

        const addresses = await Address.find({ userId });

        res.json({
            success: true,
            address: addresses
        });

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
};
