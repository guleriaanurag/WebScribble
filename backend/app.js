const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fs = require('fs');

const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log('Connected to the Database');
}).catch((err)=>{
    console.log('Error connecting to the Database',err);
})

app.use(bodyParser.json());
app.use(cors());

app.use(userRouter);
app.use(blogRouter);


app.listen(port,(err)=>{
    if(err){
        console.log('Error in server setup');
    }
    console.log(`listening at http://localhost:${port}`);

});

app.get('/',(req,res)=>{
    res.send('Web scribles backend');
})

app.get('/image/:imageName', async (req, res) => {
    try {
        const imagepath = path.join(__dirname, 'uploads', req.params.imageName);

        const exists = await fs.promises.access(imagepath, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false);

        if (exists) {
            res.sendFile(imagepath);
        }
        else{
            res.status(404).send('Image not found')
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});