var express = require('express');
var postCtrl = require('./controllers/postController');
var router = express.Router();


//Post routes
router.route('/posts').get(postCtrl.getPosts);
router.route('/post/:id').get(postCtrl.getPost);
router.route('/addpost').post(postCtrl.postPost);

module.exports = router;

