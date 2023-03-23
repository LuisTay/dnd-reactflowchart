var express = require("express");
var authRouter = require("./auth");
var documentRouter = require("./document");
var extraRouter = require("./extra");
var app = express();

app.use("/auth/", authRouter);
app.use("/document/", documentRouter);
app.use("/extra/", extraRouter);

module.exports = app;