const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require('./models/post');
const app = express();

mongoose.connect("mongodb+srv://omar:McAtedm2JsG7CRe@cluster0-owb1g.mongodb.net/mean-app?retryWrites=true", {useNewUrlParser: true})
    .then(() => {
        console.log('Connected to the DB')
    })
    .catch(() => {
        console.log('Connection failed')
    });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// middleware to prevent CORS (Cross-Origin Resource Sharing)  error
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    // save to the db using mongoose
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
    });

});

app.get("/api/posts", (req, res, next) => {
    // get the stored data from the DB using mongoose
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: documents
            });
        });

});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "Post deleted successfully!"
            });
        });
});

module.exports = app;
