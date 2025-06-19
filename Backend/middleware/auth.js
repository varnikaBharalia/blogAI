const { verifyToken } = require("../service/auth");

function checkForAuthenticationCookie(cookieName) {
    return (req,res,next)=>{
        const tokenCookie = req.cookies.token; // Get the token from cookies
        req.user = null;
        if(!tokenCookie) return next(); 
        const user = getUser(tokenCookie); 
        req.user = user; 
        next(); 

        // const token = req.cookies[cookieName];
        // if(!token)
        // {
        //     return next();
        // }
        // try{
        //     const user = verifyToken(token);
        //     req.user = user;
        // }
        // catch(err){
        //     return res.status(401).json({message:"Unauthorized"});
        // }
        // return next();
    };
}

module.exports = checkForAuthenticationCookie;