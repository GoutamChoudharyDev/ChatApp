import jwt from "jsonwebtoken"
import User from "../models/User.js";

// Middleware to protect the routes , So unautherized user can't access the private routes like profile
export const protectRoute = async (req, res, next) => {
    try {
        // Get token from request
        const token = req.headers.token;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Get user from database
        const user = await User.findById(decoded.userId).select("-password");

        // If user doesn’t exist
        if (!user) return res.json({ success: false, message: "User not found" });

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}