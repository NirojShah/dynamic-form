import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Token is invalid or expired" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: "Authentication error" });
  }
};

export default verifyToken;
