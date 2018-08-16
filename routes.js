const express = require('express');
const authCtrl = require('./controllers/authController');
const postCtrl = require('./controllers/postController');
const router = express.Router();



//Auth routes
router.route('/login').post(authCtrl.login);
router.route('/register').post(authCtrl.register);
router.route('/securepage').get(verrifyToken ,authCtrl.securePage);

//Post routes
router.route('/posts').get(postCtrl.getPosts);
router.route('/post/:id').get(postCtrl.getPost);
router.route('/addpost').post(postCtrl.postPost);

module.exports = router;


//middlewares
function verrifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
       const bearer = bearerHeader.split(' ');
       const token = bearer[1];
       
       req.token = token;
       next();
    } else {
        return res.status(403).send("You must be logged in");
    }
};


