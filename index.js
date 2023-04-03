const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use( express.static( "public" ) );
app.set('view engine', 'ejs');
const uri = "mongodb+srv://monkeymartin86:123soleil@wtasscluster.uq13ht3.mongodb.net/Article";

const routes = require('./routes/routes');

app.use('/api', routes)


async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure');
        console.log(error);
    }
}






app.get('/', function(req, res) {
    res.redirect('/api/getl10');
});

app.get('/WriteArticle', function(req, res) {
    res.render('pages/PostArticle');
});

app.get('/LastArticles', function(req, res) {
    res.redirect('/api/getAll');
});

app.get('/Article/:id', function(req, res) {
    res.redirect('/api/getOne/' + req.params.id);
});

app.get('/EditPost/:id', function(req, res) {
    res.redirect('/api/editPost/' + req.params.id);
});


connect();
app.listen(3000, () => {
    console.log('Server started on port 3000');
});