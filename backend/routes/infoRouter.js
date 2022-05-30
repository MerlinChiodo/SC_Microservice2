var express = require('express');
var infoRouter = express.Router();
var infoController = require("../controller/infoController")

infoRouter.get("/getAllInfoPosts", infoController.getAllInfoPosts)

infoRouter.post("/createInfoPost", infoController.createInfoPost)

infoRouter.delete("/deleteInfoPost/:post_id", infoController.deleteInfoPost)

infoRouter.put("/editInfoPost", infoController.editInfoPost)

module.exports = infoRouter;