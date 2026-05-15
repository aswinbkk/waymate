const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    //const header = req.header("Authorization");

    // if (!header) {
    //     return res.status(400).json({ msg: "No token provided" });
    // }

    try {
        const token = req.cookies.token
        //const token = header.split(" ")[1];
        if (!token) {
            return res.status(400).json({ msg: "No token provided" });
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.auth = decodedToken;
        next();

    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = authMiddleware;