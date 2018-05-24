var Joi = require('joi');

var validateOrder = {
    order_id : Joi.number().required(),
    order_number : Joi.string().required(),
    //order_reference : Joi.string(),
    groupaddress_id : Joi.number().required(),
    cus_id : Joi.number().required(),
    partner : Joi.number(),
    delivery_date : Joi.number().required(),
    //delivery_employer : Joi.string(),
    sender_fullname : Joi.string().required(),
    sender_address : Joi.string().required(),
    sender_phone : Joi.string().required(),
    sender_email : Joi.string().required(),
    sender_ward : Joi.number().required(),
    sender_district : Joi.number().required(),
    sender_province : Joi.number().required(),
    sender_post_id : Joi.number(),
    //sender_employer : Joi.string(),
    //sender_latitude : Joi.string(),
    //sender_longitude : Joi.string(),
    receiver_fullname : Joi.string().required(),
    receiver_address : Joi.string().required(),
    receiver_phone : Joi.string().required(),
    //receiver_email : Joi.string(),
    receiver_ward : Joi.number().required(),
    receiver_district : Joi.number().required(),
    receiver_province : Joi.number().required(),
    receiver_post_id : Joi.number(),
    //receiver_employer : Joi.string(),
    //receiver_latitude : Joi.string(),
    //receiver_longitude : Joi.string(),
    product_name : Joi.string().required(),
    product_description : Joi.string().allow(null).required(),
    product_quantity : Joi.number().required(),
    product_price : Joi.number().required(),
    product_weight : Joi.number().required(),
    product_type : Joi.string().required(),
    order_payment : Joi.number().required(),
    order_service : Joi.string().required(),
    //order_service_add : Joi.string(),
    //order_voucher : Joi.string(),
    order_status : Joi.number().required(),
    order_post_id : Joi.string().required(),
    order_systemdate : Joi.number().required(),
    //order_statusdate : Joi.string(),
    //order_acceptdate : Joi.string(),
    //order_successdate : Joi.string(),
    order_employer : Joi.number(),
    //order_note : Joi.string(),
    money_collection : Joi.number().required(),
    money_totalfee : Joi.number().required(),
    money_feecod : Joi.number(),
    money_feevas : Joi.number(),
    money_feeinsurrance : Joi.number(),
    money_fee : Joi.number(),
    money_feeother : Joi.number(),
    money_totalvat : Joi.number().required(),
    money_total : Joi.number(),
    //order_type : Joi.string(),
    //evtpcode : Joi.string(),
    //collected_by : Joi.string(),
    //collected_date : Joi.string(),
    //fee_collected : Joi.string(),
    //product_length : Joi.string(),
    //product_width : Joi.string(),
    //product_height : Joi.string(),
    //product_ex_weight : Joi.string()
};

module.exports = validateOrder;