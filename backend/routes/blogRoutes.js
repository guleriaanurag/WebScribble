const express = require('express');
const router = express.Router();
const upload = require('../multer');
const fs = require('fs');
const { authenticate } = require('../authentication');
const { validateBlog,validateComment,sanitizeContent } = require('../validationAndSantization');
const blog = require('../models/blog');
const comment = require('../models/comment');
const path = require('path');
const { default: mongoose } = require('mongoose');

router.get('/blogs',async(req,res)=>{
    try {
        const blogs = await blog.find().populate({path: 'author',select:'-password'}).limit(25);
        if(blogs.length>0){
            res.send({
                success: true,
                data: blogs,
                message: 'Blogs retrieved successfully.'
            })
        }
        else{
            res.send({
                success: false,
                message: 'No Blogs Found.'
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: 'There was an error in blogs retrieval.'
        });
    }
})

router.get('/blogs/:category',async (req,res)=>{
    try {
        const category = req.params.category
        const blogs = await blog.find({category}).populate({path:'author',select:'-password'}).limit(25);
        if(blogs.length>0){
            res.send({
                success: true,
                data: blogs,
                message: 'Blogs found.'
            });
        }
        else{
            res.send({
                success: false,
                message: 'Blogs not found.'
            })
        }
    } catch (error) {
        res.send({
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
            res.send({
                success: true,
                data: response,
                messge: 'Blog found'
            });
        }
        else{
            res.send({
                success: false,
                message: 'Blog not found'
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: 'Unable to find the blog'
        })
    }
})

// BLOG CRUD OPERATIONS

router.post('/blog',upload.single('image'),authenticate,validateBlog,async (req,res)=>{
    const allowedCategories =  ['All','Science','Music','Games','Fiction','Technology','Programming'];
    try {
        let imgName
        if(req.file){
            imgName = req.file.filename;
        }
        else{
            imgName = 'NoImage.jpg'
        }
        const {title,content,category,author} = req.body
        const sanitizedContent = sanitizeContent(content);
        if(!allowedCategories.includes(category)){
            res.send({success:false,message:'Inavlid blog category'});
            fs.unlink(path.join(__dirname,'..','uploads',imgName));
            return;
        }
        const newBlog = new blog({
            title,
            content:sanitizedContent,
            author,
            category,
            imageName: imgName,
            comments: []
        })
        await newBlog.save();
        res.send({success:true,message:'blog saved'});
    } catch (error) {
        res.send({
            success: false,
            message: error.message || 'An error occured while adding the blog.'
        })
    }
})


router.patch('/blog/:id',upload.single('image'),authenticate,validateBlog,async (req,res)=>{
    try {
        const blogPost = await blog.findById(req.params.id);
        const authorId = new mongoose.Types.ObjectId(req.body.author);
        if(blogPost){
            if(authorId.equals(blogPost.author)===false){
                res.send({success: false,message: 'Unauthorized access'});
                return;
            }
            let imgName;
            if(req.file){
                imgName = req.file.filename;
            }
            else{
                imgName = blogPost.imageName;
            }
            const prevImageName = blogPost.imageName;
            if(imgName!==prevImageName){
                fs.unlinkSync(path.join(__dirname,'..','uploads',prevImageName));
            }
            const { title,content } = req.body
            const updatedBlog = new blog({
                _id: blogPost._id,
                title,
                content,
                category:blogPost.category,
                author: blogPost.author,
                imageName: imgName,
                comments: [...blogPost.comments]
            })
            await blog.updateOne({_id: req.params.id},updatedBlog);
            res.send({success: true,message: 'Blog updated successfully'});
        }
        else{
            res.send({success:false,message:'Something went wrong...'});
        }
    } catch (error) {
        res.send({
            success: false,
            message: 'Something went wrong...'
        })
    }
})

router.delete('/blog/:id',authenticate,async (req,res)=>{
    try {
        const blogToDelete = await blog.findById(req.params.id);
        const authorId = new mongoose.Types.ObjectId(req.body.author);
        if(authorId.equals(blogToDelete.author)===false){
            res.send({success: false,message:'Unauthorized access'});
            return;
        }
        const deletedBlog = await blog.findOneAndDelete({_id: blogToDelete._id});
        const imgName = deletedBlog.imageName;
        if(imgName!=='NoImage.jpg'){
            fs.unlinkSync(path.join(__dirname,'..','uploads',imgName));
        }
        const commentsToDelete = deletedBlog.comments;
        commentsToDelete.map(async(comm)=>{
            await comment.findByIdAndDelete(comm._id);
        })
        res.send({
            success: true,
            message: 'Blog post deleted successfully.'
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message || 'Something went wrong...'
        })
    }
})

router.post('/blog/:id/comment',authenticate, validateComment ,async (req,res)=>{
    try {
        const blogPost = await blog.findById(req.params.id);
        if(!blogPost){
            res.send({success: false,message:'Unable to add the comment'})
        }
        const { userComment } = req.body;
        const newComment = new comment({
            userComment,
            author: req.userId
        })
        const savedComment = await newComment.save();
        blogPost.comments.unshift(savedComment._id);
        res.send({
            success: true,
            message: 'Comment added to the post seccessfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message: 'An error occured while posting the comment'
        })
    }
})

router.patch('/blog/:blogId/comment/:id',authenticate,validateComment,async(req,res)=>{
    try{
        const { userComment } = req.body;
        await comment.findByIdAndUpdate(req.params.id,userComment);
        res.send({
            success: true,
            message: 'Comment updated successfully.'
        })
    }
    catch(error){
        res.send({
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
        res.send({
            success: true,
            message: 'Comment deleted successfully.'
        })
    } catch (error) {
        res.send({
            success:false,
            message: 'The comment could not be deleted.'
        })
    }
})

module.exports = router;