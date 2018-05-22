var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../auth/VerifyToken');
var KafkaService = require('../common/KafkaService');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var ClientApp = require('../client_app/ClientApp');
var Joi = require('joi');
var ValidateOrder = require('../validation/order');
var Setting = require('../common/Setting');
/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file


router.post('/push-order',VerifyToken, function(req, resp) {
    if (req.body.orderInfo == undefined)
    {
        resp.status(200).send('orderInfo is required!!!');
        return;
    }

    //resp.status(200).send({"status" : "OK", "msg" : "message received!!!"});

    // err === null -> valid
    Joi.validate(req.body.orderInfo, ValidateOrder, function (err, value) {
        if (err === null) {
            var topicName = Setting.TOPIC_NAME;
            var kafkaKey = Setting.KAFKA_KEY;
            var kafkaValue = new Buffer(req.body.orderInfo);
            var rs = new KafkaService();
            rs.sendMessage({topic: topicName,
                messages: [kafkaValue],
                key: kafkaKey});
        }
        else {
            //error
            err.status = "ValidateError";
            resp.status(200).send(err);
        };
    });
});

module.exports = router;