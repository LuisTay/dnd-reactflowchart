const Extra = require("../models/ExtraInfoModel");
const { body,validationResult } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", true);

// Extra Schema
function ExtraData(data) {
	this.id = data._id;
	this.content= data.content;
}

function uniqueStore(new_data) {
	Extra.findOne({content: new_data.content}).then(extra => {
		if (extra === null) {
			new_data.save(function (err) {
				if (err) {
					return apiResponse.ErrorResponse(res, err);
				}
			});
		}
	});
}

/**
 * get List.
 * 
 * @returns string
 */
exports.Get = [
//	auth,
	function (req, res) {

		try {
			Extra.findOne({}).then((extra)=>{
                return apiResponse.successResponseWithData(res,"Load Extra Info Success", extra);
            }).catch((err)=>{
                return apiResponse.ErrorResponse(res, err);
            });
		} catch (e) {
			return apiResponse.ErrorResponse(res, e);
		}
	}
];
/**
 * extra info store.
 * 
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * 
 * @returns {Object}
 */
exports.Store = [
//	auth,
	(req, res) => {
		try {
            Extra.remove({}, function (err, result) {
                if (err){
                    return apiResponse.ErrorResponse(res, err);
                }else{
                    new_item = new Extra({content: req.body.content});
                    new_item.save(function(err,result){
                        if (err){
                            return apiResponse.ErrorResponse(res, err);
                        }
                        else{
                            return apiResponse.successResponse(res,"Extra Info add Success.");
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
