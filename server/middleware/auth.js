const { User } = require('./../models/user');

let auth = (req, res, next ) => {
    let token = req.cookies['x-auth'];
    User.findByToken(token).then((user) => {
        if (!user) {  return Promise.reject(); }
        console.log('user FOUND!');
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).json({ error: true}); 
      });
}

module.exports = {
     auth
 }