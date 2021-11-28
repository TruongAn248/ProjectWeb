const express = require("express");
const info = require("../controllers/info.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();


    router.get("/", info.findAll);
    router.get("/:id", info.findOne);
    router.use(middlewares.verifyToken);

    router.post("/", info.create);
    router.put("/:id", info.update);
    router.delete("/infoId/:id", info.delete);
    router.delete("/", info.deleteAll);

    app.use("/api/info", router);
};
