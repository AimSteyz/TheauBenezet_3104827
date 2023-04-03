const express = require('express');
const router = express.Router();
module.exports = router;
const Model = require('../models/model');
const commentaries = require('../models/commentary');
//Post Method
router.post('/post', async (req, res) => {
    // show response
    console.log(req.body);
    
    const data = new Model({
        title: req.body.title,
        author: req.body.author,
        //get the time from the server
        time: new Date().toLocaleString(),
        content: req.body.content
    })
    try {
        const dataToSave = await data.save();
    }
    catch (error) {
    }
    res.redirect('/');
})
//post method for the commentaries
router.post('/postCommentary/:id', async (req, res) => {
    // show response
    const comms = new commentaries({
        title: req.body.title,
        author: req.body.author,
        //get the time from the server
        time: new Date().toLocaleString(),
        content: req.body.content,
        associatedArticle: req.params.id
    })
    try {
        const commentariesToSave = await comms.save();
    }
    catch (error) {
        console.log("ERROR : " + error);
    }
    res.redirect('/article/' + req.params.id);
})
//Get all Method
router.get('/getAll', async (req, res) => {
    const result = await Model.find();
    res.render('pages/LastArticle', {data: result});
});

//Get all Method
router.get('/getl10', async (req, res) => {
    const result = await Model.find();
    res.render('pages/index', {data: result});
});

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    const result = await Model.find();
    const comms = await commentaries.find();
    //get the id from the url
    const id = req.params.id;
    //find the article with the id
    const article = result.find(article => article._id == id);
    
    // find all the comments with the id
    const comments = comms.filter(comment => comment.associatedArticle == id);
    res.render('pages/Article', {data: article, comments: comments});
});

// //Update Method
// router.put('/update/:id', (req, res) => {
//     res.send('Update Method');
// });

//Delete Method
router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Model.findByIdAndDelete(id);
    //delete all the commentaries associated with the article
    const comms = await commentaries.deleteMany({associatedArticle: id});
    res.redirect('/');
});

router.get('/editPost/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Model.find();
    const article = result.find(article => article._id == id);
    res.render('pages/EditPost', {data: article});
});

router.post('/update/:id', async (req, res) => {
    //get the article
    const id = req.params.id;
    const result = await Model.find();
    const article = result.find(article => article._id == id);
    //update the article
    article.title = req.body.title;
    article.author = req.body.author;
    article.content = req.body.content;
    //save the article
    const dataToSave = await article.save();
    res.redirect('/article/' + id);
    
});