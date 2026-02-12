import { Jwt } from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    // 1. Extract token from the cookie
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    // 2. Verify the token using your secret key
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Token is invalid or expired" });
    }

    // 3. Attach user data to the request and proceed
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication error" });
  }
};

export default auth;
