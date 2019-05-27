const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require('./routes/posts');
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
        "GET, POST, PATCH, DELETE,PUT, OPTIONS"
    );
    next();
});

app.use("/api/posts",postsRoutes);

module.exports = app;
