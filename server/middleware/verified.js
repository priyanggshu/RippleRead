import jwt from "jsonwebtoken";

const verified = (req, res, next) => {
    const AuthHeader = req.headers.authorization;
    console.log("AuthHeader", AuthHeader)

    if(!AuthHeader || !AuthHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided"})
    }
    
    const token = AuthHeader.split(" ")[1];
    console.log("token", token)
    try {
        const verified_user = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verified user", verified_user)
        req.user = verified_user;
        console.log("req.user", req.user);
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or Expired token" });
    }
};

export default verified;
