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
    client = new kafka.Client(Setting.ZOOKEEPER_URI, 'kafka-broker');
    producer = new kafka.HighLevelProducer(client, {});
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

KafkaService.prototype.sendMessage = function(payload) {
    var operation = retry.operation({
        // See https://github.com/tim-kos/node-retry for config options
    });
    operation.attempt(function(currentAttempt) {
        producerReady.then(function(producer) {
            producer.send(payload, function(err, data) {

                // if (err) {
                // 	operation.retry(err);
                // 	return;
                // }

                return messageHandler(err, data);
            });
        });
    });
};
module.exports = KafkaService;