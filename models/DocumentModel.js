var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
	nodes: {type: Array},
	edges: {type: Array}
}, {timestamps: true});

module.exports = mongoose.model("Document", DocumentSchema);