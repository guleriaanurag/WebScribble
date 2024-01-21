const { default:mongoose } = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    content:{
        type: String,
        trim: true,
        required: true
    },
    category:{
        type: String,
        default: 'All'
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    imageName:{
        type: String,
        default: 'NoImage.jpg',
    },
    comments:[{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comment'
    }]
},{timestamps:true})

const blog = mongoose.model('blog',blogSchema);

module.exports = blog;