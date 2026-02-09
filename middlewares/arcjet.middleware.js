import aj from "../config/arcjet.js";
import { ARCJET_KEY, ARCJET_ENV } from "../config/env.js";

const arcjetMiddleware = async (req,res,next) => {
    try{
        // Allow Postman for testing
        const userAgent = req.headers['user-agent'] || '';
        if (userAgent.includes('Postman')) {
            return next();
        }

        const decision = await aj.protect(req, { requested: 1 });
        if(decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({ error: "Too Many Requests" });
            } else if (decision.reason.isBot()) {
                res.status(403).json({ error: "No bots allowed" });
            } else {
                res.status(403).json({ error: "Forbidden" });
            }
        } else {
            next();
        }
    }
    catch(error){
        next(error);
    }
}

export default arcjetMiddleware;