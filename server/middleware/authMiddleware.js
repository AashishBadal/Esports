import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware to verify JWT token
export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied. No token provided." 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database to ensure user still exists
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Token is not valid. User not found." 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: "Token is not valid." 
    });
  }
};

// Middleware to check for specific roles
export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied. Authentication required." 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. Required role: ${roles.join(" or ")}` 
      });
    }

    next();
  };
};

// Middleware to check if user is a player
export const requirePlayer = requireRole("player");

// Middleware to check if user is an organizer
export const requireOrganizer = requireRole("organizer");