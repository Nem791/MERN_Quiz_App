const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // var sessData = req.session;

    // Lay token tu session
    // let token = sessData.auth_token;

    // Lay token tu req.headers
    let token = req.headers["authorization"];
    token = token.replace('Bearer ', '');
    console.log('Token: ' + token);
    // if (!token) return res.status(401).send('You do not have permission 4 this action');

    try {
        // if (!token) {
        //     req.user = undefined;
        //     next();
        // } else {
        //     const checkToken = jwt.verify(token, 'masobimat01');
        //     req.user = checkToken;
        //     next();
        // }
        
        // If else token ton` tai hay khong`
        req.user = (!token) ? undefined : jwt.verify(token, 'masobimat01');
        console.log("req.user: ", req.user);
        next();

    } catch (error) {
        console.log(error);
        console.log(error instanceof jwt.TokenExpiredError);
        res.status(400).send(error);
    }
}