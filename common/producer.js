var Setting = require('../common/Setting')
//var Kafka = require('node-rdkafka');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../auth/VerifyToken');
var requestPromise = require('request-promise');
var ValidateOrder = require('../validation/order')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

//console.log(Kafka.features);
//console.log(Kafka.librdkafkaVersion);
/*

var producer = new Kafka.Producer({
    'metadata.broker.list': Setting.KAFKA_URI,
    'dr_cb': true
});

var topicName = Setting.TOPIC_NAME;
var kafkaKey = Setting.KAFKA_KEY;
var partition = -1;

//logging debug messages, if debug is enabled
producer.on('event.log', function(log) {
    console.log(log);
});

//logging all errors
producer.on('event.error', function(err) {
    console.error('Error from producer');
    console.error(err);
});

producer.on('delivery-report', function(err, report) {
    console.log('delivery-report: ' + JSON.stringify(report));
    counter++;
});

//Wait for the ready event before producing
producer.on('ready', function(arg) {
    console.log('producer ready.' + JSON.stringify(arg));
});

producer.on('disconnected', function(arg) {
    console.log('producer disconnected. ' + JSON.stringify(arg));
});

//starting the producer
producer.connect();
*/

router.post('/push-order',VerifyToken, function(req, resp) {
    if (req.body.orderInfo == undefined)
    {
        res.status(200).send('orderInfo is required!!!');
        return;
    }

    res.status(200).send({"status" : "OK", "msg" : "message reciveid!!!"});

    // err === null -> valid
    /*Joi.validate(req.body.orderInfo, ValidateOrder, function (err, value) {
        if (err === null) {
            var kafkaValue = new Buffer(req.body.orderInfo);
            producer.produce(topicName, partition, kafkaValue, kafkaKey);
        }
        else {
            //error
            res.status(200).send(err);
        };
    });*/
});

