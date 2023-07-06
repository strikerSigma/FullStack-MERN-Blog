const mongodb = require('mongoose')
const {Schema,model} = mongodb;

const BlogPost = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: String
},{
    timestamps: true
})

const PostModel = model('Post', BlogPost)

module.exports = PostModel;