const Document = require("../models/DocumentModel");
const { body,validationResult } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", true);
const ExtraInfo = require("../models/ExtraInfoModel");

// Document Schema
function DocumentData(data) {
	this.id = data._id;
	this.nodes= data.nodes;
	this.edges = data.edges;
}

function uniqueStore(new_data) {
	Document.findOne({nodes: new_data.nodes, edges: new_data.edges}).then(document => {
		if (document === null) {
			new_data.save(function (err) {
				if (err) {
					return apiResponse.ErrorResponse(res, err);
				}
			});
		}
	});
}

/**
 * Document List.
 * 
 * @returns {Object}
 */
exports.documentList = [
//	auth,
	function (req, res) {

		try {
			Document.findOne({}).then((doc)=>{
                return apiResponse.successResponseWithData(res,"Load Document Success", doc);
            }).catch((err)=>{
                return apiResponse.ErrorResponse(res, err);
            });
		} catch (e) {
			return apiResponse.ErrorResponse(res, e);
		}
	}
];
/**
 * Document store.
 * 
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * 
 * @returns {Object}
 */
exports.documentStore = [
//	auth,
	(req, res) => {
		try {
			Document.remove({}, function (err, result) {
                if (err){
                    return apiResponse.ErrorResponse(res, err);
                }else{
                    new_item = new Document({nodes: req.body.nodes, edges: req.body.edges});
                    new_item.save(function(err,result){
                        if (err){
                            return apiResponse.ErrorResponse(res, err);
                        }
                        else{
                            return apiResponse.successResponse(res,"Document Info add Success.");
                        }
                    });
                }
            });
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];