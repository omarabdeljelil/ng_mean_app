const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post("", (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id, // reuse the id
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {
        res.status(200).json({message: 'Post is updated'});
    })
});
router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found'});
        }
    })
});
router.get("", (req, res, next) => {
    // get the stored data from the DB using mongoose
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: documents
            });
        });

});

router.delete("/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "Post deleted successfully!"
            });
        });
});

module.exports = router;
