const { default:mongoose} = require('mongoose');

const commentSchema = new mongoose.Schema({
    userComment:{
        type:String,
        required:true,
        trim: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},{timestamps:true})

const comment  = mongoose.model('comment',commentSchema);

module.exports = comment;