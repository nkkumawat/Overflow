/**
 * Created by sonu on 22/9/17.
 */

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
    questions:[]
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
    console.log(id + "fsssssssssssssssssssssssssssssssssssssssssssssssssssssssnarendra")
    sql = "SELECT * FROM questions , login where qid = '"+id+"' and askedby = id ";
    con.query(sql, function (err, result, fields) {
        staterData.questions = result;
        console.log(result[0].title);
        res.render('questionbyid', staterData);
    });
});

module.exports = router;
