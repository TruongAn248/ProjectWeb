const mongoose = require("mongoose");
const createInfoModel = require("./info.model");
const createUserModel = require("./user.model");
const createChapterModel = require("./chapter.model");
const createaddimgchapterModel = require("./addimgchapter.model");

const db = {};
db.mongoose = mongoose;
db.User = createUserModel(mongoose);
db.Info = createInfoModel(mongoose);
db.Chapter = createChapterModel(mongoose);
db.AddImgChapter = createaddimgchapterModel(mongoose);

module.exports = db;
