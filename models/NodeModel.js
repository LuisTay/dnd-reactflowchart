var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NodeSchema = new Schema({
	data: {type: Object}, 
	dragging: {type: Boolean},
	height: {type: Number},
	id: {type: String},
	position: {type: Object},
	positionAbsolute: {type: Object},
	selected: {type: Boolean},
    type: {type: String},
    selected: {type: Boolean},
}, {timestamps: true});

module.exports = mongoose.model("nodes", NodeSchema);