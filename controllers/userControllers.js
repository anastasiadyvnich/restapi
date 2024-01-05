const AppError = require("../errors/appError");
const dbConnect = require("../connection/connection");

exports.getAllUsers = (req, res, next) => {
    dbConnect.query("SELECT * FROM user", function (err, data, fields) {
        if (err) return next(new AppError(err));
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
};

exports.createUser = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.login,
        req.body.email,
        req.body.Role,
        req.body.password,
        req.body.picture = null,
    ];
    dbConnect.query(
        "INSERT INTO user (login, email, Role, password, picture) VALUES(?)",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "user added!",
            });
        }
    );
};

exports.getUserById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    dbConnect.query(
        "SELECT * FROM user WHERE idUser = ?",
        [req.params.id],
        function (err, data, fields) {
            if (data.length === 0) return next(new AppError("User not found", 404))
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};

exports.updateUser = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    dbConnect.query(
        "UPDATE user SET login=?, email=?, Role=?, password=? WHERE idUser=?",
        [
            req.body.login,
            req.body.email,
            req.body.Role,
            req.body.password,
            req.params.id,
        ],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "user info updated!",
            });
        }
    );
};


exports.deleteUser = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No todo id found", 404));
    }
    dbConnect.query(
        "DELETE FROM user WHERE idUser=?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "user deleted!",
            });
        }
    );
};