const jwt = require("jsonwebtoken");
const User = require("../models/usermodel"); // Replace with the correct path to your User model

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Extract token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3. Find the user in MongoDB using the _id from the decoded token
    const user = await User.findById(decoded.userId); // _id is the default primary key in MongoDB
console.log("ui",user)
    if (!user) { 
      return res.status(404).json({ message: "User not found" }); 
    }

    // 4. Attach user data to the request object
    req.user = user;

    // 5. Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;