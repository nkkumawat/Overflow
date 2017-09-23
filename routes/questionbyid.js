/**
 * Created by sonu on 22/9/17.
 */

var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "overflow"
});
var staterData = {
    title: 'Express',
    company : "TECH OVERFLOW",
    username: "",
    questions:[],
    answers : []
};

/* GET home page. */
router.get('/', function(req, res, next) {
    // if(!req.session.user) {
    //     res.render('login' , staterData);
    // } else {
    //     staterData.username = req.session.user[0].name;
    //     res.render('index', staterData);
    // }
    const id = req.query.id;
    sql = "SELECT * FROM questions , login  where questions.qid = '"+id+"' and questions.askedby = login.id ";
    con.query(sql, function (err, result, fields) {
        staterData.questions = result;
        console.log(result[0].title);
        sql = "SELECT * FROM  answer  where qid = '"+id+"' order by answeredtime desc";
        con.query(sql, function (err, result, fields) {
            staterData.answers = result;
            console.log(result[0].title);
            res.render('questionbyid', staterData);
        });

    });

});

module.exports = router;
