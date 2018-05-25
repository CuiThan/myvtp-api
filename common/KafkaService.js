var Setting = require('../common/Setting')
var kafka = require('kafka-node');
var Promise = require('bluebird');
var retry = require('retry');
var client;
var producer;
var producerReady;

var closeClient = function() {
    client.close();
};

var bindListeners = function() {
    producer.on('error', function(err) {
        console.log(err);
        closeClient();
    });
    producer.on('SIGTERM', function() {
        closeClient();
    });
    producerReady = new Promise(function(resolve, reject) {
        producer.on('ready', function() {
            resolve(producer);
        });
    });
};

var initializeClient = function() {
    client = new kafka.KafkaClient({kafkaHost: Setting.KAFKA_URI});
    producer = new kafka.HighLevelProducer(client);
    bindListeners();
};

var messageHandler = function(err, data) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log(data);
        return;
    };
};

var KafkaService = function() {
    initializeClient();
};

KafkaService.prototype.sendMessage = function(payload, resp) {
    var operation = retry.operation({
        // See https://github.com/tim-kos/node-retry for config options
    });
    operation.attempt(function(currentAttempt) {
        producerReady.then(function(producer) {
            producer.send(payload, function(err, data) {

                if (err) {
                    console.log(err);
                    resp.status(200).send({"status" : "ERROR", "msg" : err});
                    return;
                } else {
                    console.log(data);
                    resp.status(200).send({"status" : "OK", "msg" : "message received!!!"});
                    return;
                };
            });
        });
    });
    closeClient();
};
module.exports = KafkaService;