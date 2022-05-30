const prisma = require('../lib/prisma');

exports.getAllInfoPosts = async (req, res, next) =>{
    res.send("getAllInfoPosts");
};

exports.createInfoPost = async (req, res, next) => {
    res.send("createInfoPost");
};

exports.deleteInfoPost = async (req, res, next)=>{
    res.send("deleteInfoPost");
};

exports.editInfoPost = async (req, res, next) =>{
    res.send("editInfoPost");
};