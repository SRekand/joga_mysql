// import database connection
const con = require('../utils/db');

// show all articles - index page
const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result;
        res.render('index', {
            articles: articles
        })
    })
};

// show article by this slug
const getArticlesBySlug = (req, res) => {
    let query = `SELECT *, author.name AS author_name, article.name AS article_name FROM author INNER JOIN article ON author.id = article.author_id WHERE slug="${req.params.slug}"`
    let article
    con.query(query, (err,result) => {
        if (err) throw err;
        article = result;
        res.render('article', {
            article: article
        });
    });
};

// export controller functions
module.exports = {
    getAllArticles,
    getArticlesBySlug
};