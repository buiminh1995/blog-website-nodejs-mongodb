const mongoose = require('mongoose') 
const Schema = mongoose.Schema

//Schema defines the structure of our documents 
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true}) //optional object

const Blog = mongoose.model('Blog', blogSchema) //why is it 'Blog' though?
module.exports = Blog