const express = require("express");
const addimgchapter = require("../controllers/addimgchapter.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();

    
    router.get("/chapterid/:id", addimgchapter.findAll);
    router.get("/:id", addimgchapter.findOne);
    router.use(middlewares.verifyToken);

    router.post("/", addimgchapter.create);
    router.delete("/chapterid/:id", addimgchapter.delete);

    app.use("/api/addimgchapter", router);
};
