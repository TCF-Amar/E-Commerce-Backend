import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const token = req.headers.token; // This is where we get the token from 'token' header

  if (!token) {
    return res.json({
      success: false,
      message: "Authentication failed. Token missing.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token using JWT_SECRET
    req.user = decoded; // Add user info (id) to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authenticateUser;
