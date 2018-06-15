var Joi = require('joi');

var validateOrderStatus = {
    order_number : Joi.string().required(),
    order_status : Joi.number().optional(),
    tracking_time : Joi.number().optional(),
    post_id : Joi.number().optional().allow(null),
    tracking_note : Joi.string().optional().allow(null),
    cus_id : Joi.number().optional().allow(null),
    partner : Joi.number().optional().allow(null),
};

module.exports = validateOrderStatus;