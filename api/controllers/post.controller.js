import Post from '../models/Post.model.js';
import User from '../models/User.model.js';
import { errorHandler } from '../utils/error.js';

export const createPost = async(req, res) => {
    try {
        const {title, content} = req.body;
        const author = await User.findById(req.user.id);
        if(!title || !content) {
            throw errorHandler(404, 'no title or content found!');

        }
        if(!author) {
            throw errorHandler(404, 'author not found!');
        }
        const newPost = new Post({
            title, content, cover:req.file ? req.file.filename : null,
            author: author._id,
        });
        await newPost.save();
        res.status(201).json(newPost);

    } catch(error) {
        console.error(error.message);
        res.status(error.statusCode).json(error.message);
    }
};

export const getAllPost = async(req, res) => {
    try {
        const posts = await Post.find()
        .populate('author', 'username')
        .sort( {title: 1 } );
        res.status(200).json(posts);

    } catch (error) {
        console.error(error.message);
        res.status(500).json('internal server error')
    }
};

export const getSinglePost = async(req, res) => {
    try {
        const {id} = req.params;
        const postId = await Post.findById(id).populate('author', 'username');
        if(!postId) {
            throw errorHandler(404, 'post not found');
        }
        res.status(200).json(postId);
    } catch(error) {
        console.error(error.message);
        res.status(error.statusCode).json(error.message);
    }
};

export const updatePost = async(req, res) => {
    try {
        const {id} = req.params;
        const {title, summary, content} = req.body;
        const author = await User.findById(req.user.id);
        const post = await Post.findById(id);
        if(!post) {
            throw errorHandler(404, 'post not found!');
        }
        const updateObject = {
            title: title,
            summary: summary,
            content: content,
            cover: req.file ? req.file.filename : Post.cover
        };
        const updatedPost = await Post.findByIdAndUpdate(id, updateObject,{new:true, runValidators:true});
        if(!updatePost) {
            throw errorHandler(404, 'post not found');
        }
        res.status(200).json(updatePost);
    } catch(error) {
        console.error(error.message || 'internal server error');
        res.status(error.statusCode || 500).json(error.message || 'internal server error')
    }
};