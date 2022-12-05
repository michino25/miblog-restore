const Post = require('../models/Post');
const { mongooseObject } = require('../../tools/mongoose');

class PostController {
    // GET /post/:slug
    show(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            .then((post) => {
                // res.json(post)
                res.render('post/show', {
                    post: mongooseObject(post),
                });
            })
            .catch(next);
    }

    // GET /post/create
    create(req, res, next) {
        res.render('post/create');
    }

    // POST /post/store
    store(req, res, next) {
        const post = new Post(req.body);
        post.save()
            .then(() => res.redirect('/'))
            .catch(next);
    }

    // [GET] /post/:id/edit
    edit(req, res, next) {
        Post.findById(req.params.id)
            .then((post) =>
                res.render('post/edit', {
                    post: mongooseObject(post),
                }),
            )
            .catch(next);
    }

    // [PUT] /post/:id
    update(req, res, next) {
        Post.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/posts'))
            .catch(next);
    }

    // [DELETE] /post/:id
    destroy(req, res, next) {
        Post.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /post/:id/restore
    restore(req, res, next) {
        Post.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /post/:id/force
    forceDestroy(req, res, next) {
        Post.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /post/controlform
    controlForm(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Post.delete({ _id: { $in: req.body.postIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.send('Action is invalid!');
        }
    }
}

module.exports = new PostController();
