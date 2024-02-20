const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

function sanitizeContent(blog){
    const window = new JSDOM('').window();
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(blog);
    return clean;
}

function validateComment(req,res,next){
    try {
        const{ userComment } = req.body;
        if(!userComment){
            res.send({
                success: false,
                message: 'Comment cannot be empty'
            })
            return;
        }
        if(typeof userComment !== 'string'){
            res.send({
                success: false,
                message: 'Invalid data type for comment'
            })
            return;
        }
        const commentLength = userComment.trim().length;
        if(commentLength > 5 || commentLength < 200){
            res.send({
                success: false,
                message: 'Comment length should be in betweem 5 to 200 characters.'
            })
            return;
        }
        next();
    } catch (error) {
        res.send({
            success: false,
            message: 'An error occured...'
        })
    }
}

function validateBlog(req,res,next){
    try {
        const { title,content } = req.body;
        if(!title){
            res.send({
                success: false,
                message: 'Title missing.'
            })
        }
        if(!content){
            res.send({
                success: false,
                message: 'Content missing.'
            })
        }
        if(typeof title !== 'string' && typeof content !== 'string'){
            res.send({
                success: false,
                message: 'String datatype should be used for title and content.'
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: 'An error occured...'
        })
    }
}

module.exports = {validateComment,validateBlog,sanitizeContent}