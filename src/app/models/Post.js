const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const Post = new Schema(
    {
        author: { type: String, required: true },
        title: { type: String, required: true },
        body: { type: String },
        image: { type: String },
        date: { type: String },
        voter: { type: Number, default: 0 },
        slug: { type: String, slug: ['title', 'author'], unique: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// Add plugins
Post.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Post', Post);
