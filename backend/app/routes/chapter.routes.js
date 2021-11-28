const express = require("express");
const chapter = require("../controllers/chapter.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();


    router.get("/s/:id", chapter.findAll);
    router.get("/:id", chapter.findOne);
    router.use(middlewares.verifyToken);

    router.post("/", chapter.create); 
    router.delete("/s/:id", chapter.delete);

    app.use("/api/chapter", router);
};
