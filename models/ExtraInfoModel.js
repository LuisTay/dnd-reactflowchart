var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ExtraInfoSchema = new Schema({
	content: {type: String}
}, {timestamps: true});

module.exports = mongoose.model("extrainfo", ExtraInfoSchema);