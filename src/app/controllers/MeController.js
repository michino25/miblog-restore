const Post = require('../models/Post');
const { multipleMongooseObject } = require('../../tools/mongoose');

class MeController {
    // [GET] /me/stored/post
    storedPosts(req, res, next) {
        Promise.all([Post.find({}), Post.countDocumentsDeleted()])
            .then(([posts, deletedCount]) =>
                res.render('me/stored-posts', {
                    deletedCount,
                    posts: multipleMongooseObject(posts),
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/post
    trashPosts(req, res, next) {
        Post.findDeleted({})
            .then((posts) =>
                res.render('me/trash-posts', {
                    posts: multipleMongooseObject(posts),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
