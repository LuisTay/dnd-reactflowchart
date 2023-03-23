var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EdgeSchema = new Schema({
	type: {type: String}, 
	omb: {type: String},
	year: {type: Number},
	name: {type: String},
	ssn: {type: String},
	data: {type: Object},
	pages: {type: Array}
}, {timestamps: true});

module.exports = mongoose.model("edges", EdgeSchema);