const express = require('express');


const authCtrl = require('./controllers/authController');
const postCtrl = require('./controllers/postController');
const router = express.Router();


//MULTER
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // cb(null,  __dirname.replace('routes', '') + '/uploads')
        cb(null,  './public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadImage = multer({storage: storage, limits: {
        fileSize: 2048 * 2048 
        },
        fileFilter: fileFilter
    })



//Auth routes
router.route('/login').post(authCtrl.login);
router.route('/register').post(authCtrl.register);
router.route('/securepage').get(verrifyToken ,authCtrl.securePage);

//Post routes
router.route('/posts/:sub').get(postCtrl.getPosts);
router.route('/posts/u/:username').get(postCtrl.getPostsForUser);
router.route('/post/:id').get(postCtrl.getPost);
router.route('/addpost').post(postCtrl.postPost);
router.route('/uploadimage').post(uploadImage.single('image'), postCtrl.uploadImage);
router.route('/votepost').put(verrifyToken, postCtrl.votePost);

module.exports = router;


//Auth middleware
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


