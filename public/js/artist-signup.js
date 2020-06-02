module.exports = function(){ 
    var express = require('express');
    var router = express.Router();
    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({extended: false});

    router.get('/', function(req, res) {
        res.render('artist-signup');
    })
    
    router.post('/', urlencodedParser, function(req, res) {
        if (req.session.sessInfo) {
            req.session.destroy(function(err) {
            });
        }
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Artists (username, firstName, lastName, password, email, birthdate) VALUES (?, ?, ?, ?, ?, ?);";
        var inserts = [req.body.username, req.body.firstName, req.body.lastName, req.body.password, req.body.email, req.body.birthdate];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/artist-login');
            }
        });
    });

    return router;
}();
