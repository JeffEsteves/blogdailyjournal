const express = require("express");
let ejs = require('ejs');

const app = express();

let _ = require('lodash');

const homeStartingContent = "Hello World !!! This is a minimalist blog style website project based on Angela Yu's bootcamp on Udemy. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const aboutContent = "This is a minimalist blog style website project based on Angela Yu's bootcamp. Technologies applied in this project were Html, CSS, Bootstrap, Javascript, Node.js, Express.js, EJS templates. It is a good project to improve skills such as routing between pages and working with templates.";

const contactContent = "You've foiund me at Github, feel free to contact me at any time to discuss about future projects or current one.";

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.set("partials", "partials/views");

app.use("*/css", express.static(__dirname + '/public/css'));

app.use("*/js", express.static(__dirname + '/public/js'));

let posts = [];

app.use(express.json());

app.get('/', function (req, res) {

  res.render('home', {
    mainContent: homeStartingContent,
    upPosts: posts
  });
});


app.get('/about', function (req, res) {
  res.render('about', {
    aboutPage: aboutContent
  });
});

app.get('/contact', function (req, res) {
  res.render('contact', {
    contactPage: contactContent
  });
});

app.get('/compose', function (req, res) {
  res.render('compose');
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post);
  res.redirect("/")
});

app.get("/posts/:check", function (req, res) {

  const reqTitle = _.lowerCase(req.params.check);

  posts.forEach(post => {

    const posted = _.lowerCase(post.title);

    if (posted === reqTitle) {
      res.render('post', {
        currentTitle: post.title,
        currentContent: post.content
      });
    };
  });
});

app.get("/search/:check", function (req, res) {

  const reqTitle = _.lowerCase(req.params.check);

  posts.forEach(post => {

    const posted = _.lowerCase(post.title);

    if (posted === reqTitle) {
      res.render('post', {
        currentTitle: post.title,
        currentContent: post.content
      });
    };
  });
});



app.listen(3000, function () {

  console.log("Server running on port 3000");

});