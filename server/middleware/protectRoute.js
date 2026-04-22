/** @format */

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
	try {
		// Try to get token from cookies first, then from Authorization header
		let token = req.cookies.jwt;
		
		if (!token) {
			// Try Bearer token from Authorization header
			const authHeader = req.headers.authorization;
			if (authHeader && authHeader.startsWith("Bearer ")) {
				token = authHeader.slice(7); // Remove "Bearer " prefix
			}
		}

		if (!token) {
			return res.status(401).json({ error: "unauthorize - No token provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

		if (!decoded) {
			return res.status(401).json({ error: "unauthorize - invalid token" });
		}

		const user = await User.findById(decoded.userId).select("-password");
		if (!user) {
			return res.status(401).json({ error: "User not found" });
		}
		req.user = user;
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;
