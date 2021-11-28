const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const AddImgChapter = db.AddImgChapter;

// Create and Save a new AddImgChapter
exports.create = async (req, res, next) => {
    // Create a AddImgChapter
    const addimgchapter = new AddImgChapter({
        img: req.body.img,
        ChapterId: req.body.ChapterId,
        ownerId: req.userId,
    });

    // Save AddImgChapter in the database
    const [error, document] = await handle(addimgchapter.save());

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while creating the AddImgChapter"
            )
        );
    }

    return res.send(document);
};

// Retrieve all AddImgChapters of a user from the database
exports.findAll = async (req, res, next) => {
    const condition = {
        ChapterId: req.params.id,
    };

    const [error, documents] = await handle(
        AddImgChapter.find(condition)

    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving AddImgChapters"
            )
        );
    }

    return res.send(documents);
};

// Find a single AddImgChapter with an id
exports.findOne = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        
    };

    const [error, document] = await handle(
        AddImgChapter.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error retrieving AddImgChapter with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "AddImgChapter not found"));
    }

    return res.send(document);
};


// Delete a AddImgChapter with the specified id in the request
exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        AddImgChapter.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Could not delete AddImgChapter with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "AddImgChapter not found"));
    }

    return res.send({ message: "AddImgChapter was deleted successfully" });
};




