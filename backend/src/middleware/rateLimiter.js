import ratelimit from "../configurations/upstash.js";

const ratelimiter=async (req,res,next) => {
    try {
        // Use client IP as identifier for rate limiting
        const identifier = req.ip || req.connection.remoteAddress || 'unknown';
        const {success, limit, reset, remaining} = await ratelimit.limit(identifier);

        // Add rate limit headers
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', remaining);
        res.setHeader('X-RateLimit-Reset', reset);

        if(!success){
            console.log(`Rate limit exceeded for ${identifier}`);
            return res.status(429).json({
                message:"Too many requests",
                retryAfter: reset
            });
        }
        
        console.log(`Request allowed for ${identifier}. Remaining: ${remaining}`);
        next();
    } catch (error) {
        console.error("Rate limit error:", error);
        // Continue without rate limiting if there's an error
        next();
    }
};

export default ratelimiter;