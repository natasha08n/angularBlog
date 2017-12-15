var config = require('./token');
var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    console.log("REQHEADERS", req.headers);
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log("REQHEADERS", req.headers);
    console.log("auth");
    console.log("token", token);
    if(token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                console.log("{ success: false, message: 'Failed to authenticate token.' }");
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                console.log("nextnextnext");
                req.decoded = decoded; 
                next();
            }
        });
    } else {
        console.log("{ success: false, message: 'No token exists.' }");
        res.send({ success: false, message: 'No token exists.' });
    }
}