import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let jwt;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      jwt = req.headers.authorization.split(" ")[1];

      // Decode token
      const decoded = jwt.verify(jwt, process.env.JWT_SECRET);

      // Attach user to req (without password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!jwt) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
