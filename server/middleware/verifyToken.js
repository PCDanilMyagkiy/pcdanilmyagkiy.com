import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const token = req.cookies.access;

    if (!token) {
        return next();
    }

    if (token) {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (decoded) {
            req.account = decoded
        }
    }

    next();
}