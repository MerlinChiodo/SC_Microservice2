var express = require('express');
var infoRouter = express.Router();

exports.getAllInfoPosts = function(req, res, next){
    res.send("getAllInfoPosts");
};
exports.createInfoPost = async (req, res, next) => {
    res.send("creteInfoPost");
};
exports.deleteInfoPost = function(req, res,next){
    res.send("deleteInfoPost");
};
exports.editInfoPost = function(req, res, next){
    res.send("editInfoPost");
};

module.exports = infoRouter;