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

// define MYSQL usage
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

// IMPORT ROUTES
const articleRoutes = require('./routes/article');
const authorRoutes = require('./routes/author');
// ARTICLE ROUTES
app.use('/', articleRoutes)
app.use('/article', articleRoutes)
// AUTHOR ROUTES
app.use('/author', authorRoutes)





// app start point
app.listen(3000, () => {
    console.log('App is started at http://localhost:3000');
});