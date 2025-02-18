import jwt from "jsonwebtoken";

const verified = (req, res, next) => {
    const token = req.headers('Authorization');
    if(!token) return res.status(401).json({ message: "Access denied" });

    try {
        const verified_user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified_user;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

export default verified;
