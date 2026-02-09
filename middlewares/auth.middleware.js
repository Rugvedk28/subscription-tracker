import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorise = async (req, res, next) => {
    //implement the authorisation logic here
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token",
            });
        }

        //if token is present, we can verify it and extract the user information from it
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
         //we attach the user information to the request object for use in subsequent middleware or route handlers

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, user not found",
            });
        }

        req.user = user;
        next(); //call next to pass control to the next middleware or route handler
    }
    catch (error) {
        next(error);
    }
}

export default authorise;