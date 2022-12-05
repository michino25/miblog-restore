const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const PostSchema = new Schema(
    {
        // _id: { type: Number, },
        author: { type: String, required: true },
        title: { type: String, required: true },
        body: { type: String },
        image: { type: String },
        date: { type: String },
        voter: { type: Number, default: 0 },
        slug: { type: String, slug: ['title', 'author'], unique: true },
    },
    {
        // _id: false,
        timestamps: true,
        versionKey: false,
    },
);

// Auto Increment Id
// PostSchema.plugin(AutoIncrement);

// custom query schema
PostSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        }).collation({ locale: 'vi', numericOrdering: true });
    }
    return this;
};

// Add plugins
PostSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Post', PostSchema);
