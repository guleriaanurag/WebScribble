import DOMPurify from 'dompurify';

export function sanitizeBlog(blog){
    const sanitizedBlog = DOMPurify.sanitize(blog);
    return sanitizedBlog;
}

export function validateEmail(email){
    if(!email.includes('@')){
        return false;
    }
    if(email.includes('@')){
        if(!(email.split('@')[1].includes('.'))){
            return false;
        }
    }
    return true;
}

export function validatePassword(password){
    if(password===null || password===''){
        return { validity:false , message: 'Password cannot be empty.' };
    }
    if(password.trim().length<8){
        return {validity:false , message: 'Password too short.'};
    }
    return {validity: true};
}

export function validateTitle(title){
    if(title===null || title===''){
        return {validity: false, message: 'Title cannot be empty.'}
    }
    return {validity: true}
}

export function validateBlog(blog){
    if(blog===null || blog===''){
        return { validity: false,message: 'Blog content cannot be empty.' }
    }
    return { validity: true};
}