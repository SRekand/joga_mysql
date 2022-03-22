const con = require('../utils/db');

const author = (req, res) => {
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
};

module.exports = {
    author
};