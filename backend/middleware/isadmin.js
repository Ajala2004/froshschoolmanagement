const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) =>{
  try {
        const token = req.cookies.token;
    
        if (!token) {
          return res.status(401).json({ message: "No token, authorization denied" });
        }
    
        // 2. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 

    // Find the user from the token payload
    const user = await User.findById(decoded.userId);
        console.log("UU",user) 
    if (!user || user.userStatus !== "admin") {
      return res.status(403).json({
        message: "Access denied. Only admins can access this resource.",
        success: false,
        error: true,
      });
    }

    // Attach user to request object
    req.user = user;

    next(); // Move to the next middleware or controller
  } catch (err) {
    res.status(401).json({
      message: "Invalid or expired token.",
      success: false,
      error: true,
    });
  }
}

module.exports =  isAdmin ;