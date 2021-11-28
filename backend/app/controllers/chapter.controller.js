const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Chapter = db.Chapter;

// Create and Save a new Chapter
exports.create = async (req, res, next) => {
    // Create a Chapter
    const chapter = new Chapter({
        name: req.body.name,
        infoId: req.body.infoId,
        ownerId: req.userId,
    });

    // Save chapter in the database
    const [error, document] = await handle(chapter.save());

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while creating the chapter"
            )
        );
    }

    return res.send(document);
};

// Retrieve all Chapters of a user from the database
exports.findAll = async (req, res, next) => {
    const condition = {
        infoId: req.params.id,
    };

    const [error, documents] = await handle(
        Chapter.find(condition)

    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving Chapters"
            )
        );
    }

    return res.send(documents);
};

// Find a single Chapter with an id
exports.findOne = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        
    };

    const [error, document] = await handle(
        Chapter.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error retrieving chapter with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "chapter not found"));
    }

    return res.send(document);
};


// Delete a chapter with the specified id in the request
exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };
    const [error, document] = await handle(
        Chapter.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Could not delete chapter with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "chapter not found"));
    }

    return res.send({ message: "chapter was deleted successfully" });
};

