const jwt = require('jsonwebtoken');
const authorization = (req,res,next)=>
{
    const authToken  =  req.headers["authtoken"];
    let user = null;
    if(!authToken)
    {
        res.json({msg: "No Auth token provided in the header"});

    }
    else
    {
        user = jwt.verify(authToken,process.env.JWT_SECRET);
    }
    
    if(user !== undefined)
    {
        res.locals.user = user;
        next();
    }
    else
    {
        res.json({msg: "Not Authorized"});
    }
}

module.exports = {
    authorization
}