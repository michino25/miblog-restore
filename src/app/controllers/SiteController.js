const Post = require('../models/Post');
const { multipleMongooseObject } = require('../../tools/mongoose');

class SiteController {
    // GET /home

    // dạng callback
    // home(req, res) {
    //     Post.find({}, function (err, posts) {
    //         if (!err)
    //             res.json(posts)
    //         else
    //             res.status(400).json({ error: 'ERROR!' })
    //     });

    //     // res.render('home');
    // }

    // dạng promise
    home(req, res, next) {
        Post.find({})
            .then((posts) => {
                res.render('home', {
                    posts: multipleMongooseObject(posts),
                });
            })
            .catch(next);
    }

    // GET /search
    search(req, res) {
        res.render('search');
    }

    // GET /database
    database(req, res, next) {
        Post.findWithDeleted({})
            .then((posts) => {
                res.json(posts);
            })
            .catch(next);
    }
}

module.exports = new SiteController();
