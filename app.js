let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let postsRouter = require('./routes/posts');

mongoose.connect('mongodb://localhost/travels', {
    family: 4
}).then(() =>{
    console.log('Connected to mongodb...')
}).catch(() =>{
    console.log('Something is wrong...')
});

let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})

app.use(express.json());
app.use(multer({storage: imageStorage}).single('imageFile'));


/*
let post1 = new Post({
    id: 2,
    title: 'Statue of Liberty',
    date: new Date(),
    description: 'some description',
    text: 'Some text',
    country: 'USA',
    imageURL: '/images/1.jpg'
});

post1.save();

*/

app.use(express.static('public'));

app.use('/posts', postsRouter);

app.listen(3000, () => {console.log('listening on 3000...')});