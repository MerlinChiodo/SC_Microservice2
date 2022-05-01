var express = require('express');
var infoRouter = express.Router();

infoRouter.get("/getAllInfoPosts", async (req, res, next) =>{
    res.send("getAllInfoPosts");
});
infoRouter.post("/createInfoPost", async (req, res, next) => {
    res.send("creteInfoPost");
});
infoRouter.delete("/deleteInfoPost/:post_id", async (req, res,next)=>{
    res.send("deleteInfoPost");
});
infoRouter.put("/editInfoPost", async (req, res, next) =>{
    res.send("editInfoPost");
});

module.exports = infoRouter;