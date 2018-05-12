var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var validator = require('validator');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var BadMessage = require('../models/BadMessage');

router.get('/monthly/:year', function (req, res) {
    BadMessage.find({
        createdAt: {
            "$gte": new Date(Date.UTC(req.params.year, 0, 1)),
            "$lte": new Date(Date.UTC(req.params.year, 11, 31))
        }
    }, function (err, badMessages) {
        const monthFrequencies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        badMessages.forEach(function(badMessage) {
            monthFrequencies[new Date(badMessage.createdAt).getMonth()]++;
        });
        console.log(err);
        if (err) return res.status(500).send("There was a problem finding the posts.");
        res.status(200).send(monthFrequencies);
    });
});

router.get('/daily/:month/:year', function (req, res) {
    BadMessage.find({
        createdAt: {
            "$gte": new Date(Date.UTC(parseInt(req.params.year), parseInt(req.params.month) - 1, 1)),
            "$lt": new Date(Date.UTC(parseInt(req.params.year), parseInt(req.params.month), 1))
        }
    }, function (err, badMessages) {
        const monthFrequencies = Array(31).fill().map((x) => 0);
        badMessages.forEach(function(badMessage) {
            monthFrequencies[new Date(badMessage.createdAt).getDate()]++;
        });
        console.log(err);
        if (err) return res.status(500).send("There was a problem finding the posts.");
        res.status(200).send(monthFrequencies);
    });
});

router.get('/:day/:month/:year', function (req, res) {
    BadMessage.find({
        createdAt: {
            "$gte": new Date(Date.UTC(parseInt(req.params.year), parseInt(req.params.month) - 1, parseInt(req.params.day))),
            "$lte": new Date(Date.UTC(parseInt(req.params.year), parseInt(req.params.month) - 1, parseInt(req.params.day) + 1))
        }
    }, function (err, badMessages) {
        console.log(err);
        if (err) return res.status(500).send("There was a problem finding the posts.");
        res.status(200).send(badMessages);
    });
});


module.exports = router;