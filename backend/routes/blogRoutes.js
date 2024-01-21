const express = require('express');
const router = express.Router();
const upload = require('../multer');
const fs = require('fs');
const { authenticate } = require('../authentication');
const { validateBlog,validateComment } = require('../validationAndSantization');
const blog = require('../models/blog');
const comment = require('../models/comment');
const path = require('path');

router.get('/blogs',async(req,res)=>{
    try {
        const blogs = await blog.find().populate({path: 'author',select:'-password'}).limit(25);
        if(blogs){
            res.status(200).json({
                success: true,
                data: blogs,
                message: 'Blogs retrieved successfully.'
            })
        }
        else{
            res.status(404).json({
                success: false,
                message: 'Blogs not found.'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'There was an error in blogs retrieval.'
        });
    }
})

router.get('/blogs/:category',async (req,res)=>{
    try {
        const category = req.params.category || 'All'
        const blogs = await blog.find({category}).populate('author').limit(25);
        if(blogs){
            res.status(200).json({
                success: true,
                data: blogs,
                message: 'Categorised Blogs found.'
            });
        }
        else{
            res.status(404).json({
                success: false,
                message: 'Blogs not found.'
            })
        }
    } catch (error) {
        res.status(500).json({
            staus: false,
            message: 'There was an error in retrieval of categorised blogs.'
        })
    }
})

router.get('/blog/:id',async (req,res)=>{
    try {
        const response = await blog.findById(req.params.id)
        .populate({
            path: 'author',
            select: '-password'
        })
        .populate({
            path: 'comments',
            model: 'comment',
            populate: {
                path: 'author',
                model: 'user',
                select: '-password'
            }
        })

        if(response){
            res.status(200).send({
                success: true,
                data: response,
                messge: 'Blog found'
            });
        }
        else{
            res.status(404).send({
                success: false,
                message: 'Blog not found'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Unable to find the blog'
        })
    }
})

// BLOG CRUD OPERATIONS

router.post('/blog',upload.single('image'),authenticate,validateBlog,async (req,res)=>{
    try {
        let imgName
        if(req.file){
            imgName = req.file.filename;
        }
        else{
            imgName = 'NoImage.jpg'
        }
        const {title,content,category,author} = req.body
        const newBlog = new blog({
            title,
            content,
            author,
            category,
            imageName: imgName,
            comments: []
        })
        await newBlog.save();
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'An error occured while adding the blog.'
        })
    }
})


router.put('/blog/:id',upload.single('image'),authenticate,validateBlog,async (req,res)=>{
    try {
        const blogPost = await blog.findById(req.params.id)
        if(blogPost){
            const imgName = req.file.filename;
            const prevImageName = blogPost.imageName;
            if(imgName!==prevImageName){
                try{
                    await fs.unlink(path.join(__dirname,'uploads',prevImageName));
                }
                catch(error){
                    throw new Error(error.message);
                }
            }
            const { title,content,category } = req.body
            const updatedBlog = new blog({
                title,
                content,
                category,
                author: blogPost.author,
                imageName: imgName,
                comments: [...blogPost.comments]
            })
            await blog.updateOne({_id: req.params.id},updatedBlog);
        }
        else{
            throw new Error('Something went wrong...');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong...'
        })
    }
})

router.delete('/blog/:id',authenticate,async (req,res)=>{
    try {
        const deletedBlog = await blog.findByIdAndDelete(req.params.id);
        const imgName = deletedBlog.imageName;
        try {
            await fs.unlink(path.join(__dirname,'uploads',imgName));
        } catch (error) {
            throw new Error(error.message);
        }
        const commentsToDelete = deletedBlog.comments;
        commentsToDelete.map(async(comm)=>{
            await comment.findByIdAndDelete(comm._id);
        })
        res.status(200).json({
            success: true,
            message: 'Blog post deleted successfully.'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong...'
        })
    }
})

router.post('/blog/:id/comment',authenticate, validateComment ,async (req,res)=>{
    try {
        const blogPost = await blog.findById(req.params.id);
        if(!blogPost){
            throw new Error('Unable to add the comment');
        }
        const { userComment } = req.body;
        const newComment = new comment({
            userComment,
            author: req.userId
        })
        const savedComment = await newComment.save();
        blogPost.comments.unshift(savedComment._id);
        res.status(200).json({
            success: true,
            message: 'Comment added to the post seccessfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occured while posting the comment'
        })
    }
})

router.put('/blog/:blogId/comment/:id',authenticate,validateComment,async(req,res)=>{
    try{
        const { userComment } = req.body;
        await comment.findByIdAndUpdate(req.params.id,userComment);
        res.status(200).json({
            success: true,
            message: 'Comment updated successfully.'
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Comment could not be updated.'
        })
    }
})

router.delete('/blog/:blogId/comment/:id',authenticate,async(req,res)=>{
    try {
        const deletedComment = await comment.findByIdAndDelete(req.params.id);
        const deletedId = deletedComment._id;
        await blog.updateOne({ _id: req.params.blogId }, { $pull: { comments: { _id: deletedId } } });
        res.status(201).json({
            success: true,
            message: 'Comment deleted successfully.'
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'The comment could not be deleted.'
        })
    }
})

module.exports = router;