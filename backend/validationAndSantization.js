function validateComment(req,res,next){
    try {
        const{ userComment } = req.body;
        if(!userComment){
            throw new Error('User comment empty')
        }
        if(typeof userComment !== 'string'){
            throw new Error('Invalid data type for a comment');
        }
        const commentLength = userComment.trim().length;
        if(commentLength > 5 || commentLength < 200){
            throw new Error('Commnet length should be between 5 and 200 characters');
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occured...'
        })
    }
}

function validateBlog(req,res,next){
    try {
        const { title,content } = req.body;
        if(!title){
            res.status(400).send({
                success: false,
                message: 'Title missing.'
            })
        }
        if(!content){
            res.status(400).send({
                success: false,
                message: 'Content missing.'
            })
        }
        if(typeof title !== 'string' && typeof content !== 'string'){
            res.status(400).send({
                success: false,
                message: 'String datatype should be used for title and content.'
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occured...'
        })
    }
}

module.exports = {validateComment,validateBlog}