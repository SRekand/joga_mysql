// application packages
const express = require('express')
const app = express()

const path = require('path')
// add template engine
const hbs = require('express-handlebars');

// setup template engine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname +'/views/layouts/',
}))

// setup static public directory
app.use(express.static('public'));

const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// create database connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
})

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to joga_mysql db");
})


const articleRoutes = require('./routes/article'); // IMPORT ARTICLE ROUTE
// ARTICLE ROUTES
app.use('/', articleRoutes)
app.use('/article', articleRoutes)


//author article controller
app.get('/author/:author_id', (req, res) => {
    let query1 = `SELECT * FROM article WHERE author_id = "${req.params.author_id}"`;
    let query2 = `SELECT id, name AS authorName FROM author WHERE id = "${req.params.author_id}"`;
    let author;
    let article;

    con.query(query1 , (err,result) => {
        if (err) throw err;
        article = result;
        con.query(query2 , (err,result) => {
            if (err) throw err;
            author = result;
            res.render('author', {
                author: author,
                article: article
            });
        });
    });
});


// app start point
app.listen(3000, () => {
    console.log('App is started at http://localhost:3000');
});