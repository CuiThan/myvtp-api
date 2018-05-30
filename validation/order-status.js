var Joi = require('joi');

var validateOrderStatus = {
    order_number : Joi.string().required(),
    order_status : Joi.number().required(),
    tracking_time : Joi.number().required(),
    post_id : Joi.number().optional().allow(null),
    tracking_note : Joi.string().optional().allow(null)
};

module.exports = validateOrderStatus;