const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, msg: "Unauthorized" });
        }

        const decodedToken = jwt.verify( token, process.env.SECRET_KEY );
        req.auth = decodedToken;
        next();

    } catch (error) {
        res.status(401).json({ success: false, msg: "Invalid token" });
    }
};

module.exports = authMiddleware;