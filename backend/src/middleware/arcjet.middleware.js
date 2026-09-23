import aj from '../lib/arcjet.js';
import { isSpoofedBot } from "@arcjet/inspect";

const arcjetProtection = async(req, res, next) => { // the whole code content can be referred from the arcjet docs
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if(decision.reason.isRateLimit()) {
                return res.status(429).json({message: "Rate limit exceeded. Please try again later."});
            } else if (decision.reason.isBot()) {
                return res.status(403).json({message: "Bot access denied"});
            } else {
                return res.status(403).json({message: "Access denied by security policy."});
            }
        }

        //check for spoofed bots
        if(decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "Spoofed Bot detected",
                message: "Malicious Bot activity detected"
            });
        }
        next();

    } catch(error) {
        console.error("arcjet protection error : ", err);
        next(); //check
    }
}
 
export default arcjetProtection;