const meRouter = require('./me.route');
const newsRouter = require('./news.route');
const siteRouter = require('./site.route');
const postRouter = require('./post.route');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/post', postRouter);
    app.use('/', siteRouter);
}

module.exports = route;
