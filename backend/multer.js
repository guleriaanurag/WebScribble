const multer = require('multer');
const path = require('path');
const {v4:uid} = require('uuid');
const dt = new Date();

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'uploads'));
    },
    filename: function(req,file,cb){
        const allowed_file_extensions = ['.png','.jpg','.jpeg','.gif'];
        const uniqueSuffix = dt.getTime()+'-'+uid();
        const ext = path.extname(file.originalname);
        if(allowed_file_extensions.includes(ext)){
            return cb(null,file.fieldname+'-'+uniqueSuffix+ext);
        }
        return cb('Not a valid a file');
    }
})

const upload = multer({storage:storage,limits: {fileSize: 1024*1024*5}})

module.exports = upload