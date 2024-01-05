const express = require("express");
const cors =require("cors");
const userRouter = require("./routes/userRouter");
const AppError = require("./errors/appError");
const errorHandler = require("./errors/errorHandler");

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exists`,404));
});
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
