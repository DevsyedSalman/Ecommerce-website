import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;

		if (!accessToken) {
			return res.status(401).json({ message: "Unauthorized - No access token provided" });
		}

		try {
			const decoded = jwt.verify(accessToken,   "21e15f5946275a00683b23dc472ef56e1ad9c617d555b29bdea919c44bdb03a32dbe5a1985d8a632b2ef651e49532e7cc6e078e72a10aec4ddca7aedd399c706106bbb5fd0acb1f3baa7cef8e53efa17e407b3ae0aa485a89089559b788e86212e6eb434611faf0e056c657ec42552e5b1450b4fda314eff3d3ff1711d3798fe2fe7a2bfecbb02298f79bf062e05ad9431d6abd7a9a7d04110bfbc41524477b6f2f13348d5117c6bddbbc21b924d55f09e4c71f49f1c7eaae9761dab84091f826a7624885fbc7e766c0f1d802c287c0c12c71021a87537084e36beda3c3f99ad51276970230b18d8377f83df66ea74fb4cbfab069bb67b12151ac0e1391a0281");
			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}

			req.user = user;

			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
};

export const adminRoute = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};
