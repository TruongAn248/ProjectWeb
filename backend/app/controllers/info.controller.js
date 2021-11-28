const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Info = db.Info;

// Create and Save a new info
exports.create = async (req, res, next) => {
    // Create a info
    const info = new Info({
        name: req.body.name,
        url: req.body.url,
        author: req.body.author,
        type: req.body.type,
        content: req.body.content,
        ownerId: req.userId,
    });

    // Save info in the database
    const [error, document] = await handle(info.save());

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while creating the info"
            )
        );
    }

    return res.send(document);
};

// Retrieve all infos of a user from the database
exports.findAll = async (req, res, next) => {
    const condition = {};
    const name = req.query.name;
    if (name) {
        condition.name = { $regex: new RegExp(name), $options: "i" };
    }

    const [error, documents] = await handle(
        Info.find(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving infos"
            )
        );
    }

    return res.send(documents);
};

// Find a single info with an id
exports.findOne = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        
    };

    const [error, document] = await handle(
        Info.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error retrieving info with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "info not found"));
    }

    return res.send(document);
};

// Update a info by the id in the request
exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Data to update can not be empty")
        );
    }

    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Info.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error updating info with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "infot not found"));
    }

    return res.send({ message: "info was updated successfully" });
};

// Delete a info with the specified id in the request
exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Info.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Could not delete info with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "info not found"));
    }

    return res.send({ message: "info was deleted successfully" });
};

// Delete all infos of a user from the database
exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handle(
        Info.deleteMany({ ownerId: req.userId })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while removing all infos"
            )
        );
    }

    return res.send({
        message: `${data.deletedCount} infos were deleted successfully`,
    });
};

// Find all favorite infos of a user
exports.findAllFavorite = async (req, res, next) => {
    const [error, documents] = await handle(
        Info.find(
            {
                favorite: true,
                ownerId: req.userId,
            },
            "-ownerId"
        )
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving favorite infos"
            )
        );
    }

    return res.send(documents);
};
