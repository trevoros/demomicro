'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var amqp = require('amqplib/callback_api');

var postMessage = function postMessage(queue, message) {
  amqp.connect('amqp://rabbitmq', function (err, conn) {

    conn.createChannel(function (err, ch) {

      ch.assertQueue(queue, { durable: true });
      ch.sendToQueue(queue, new Buffer(message), { persistent: true });
      console.log(" [x] Sent '%s'", message);
    });
    setTimeout(function () {
      conn.close();
    }, 500);

    // conn.createChannel(function(err, ch) {
    //   ch.assertExchange(exchangeName, exchangeType, {durable: true});
    //   ch.bindQueue("q1", exchangeName, routeKey, {durable: true});
    //   ch.publish(exchangeName, routeKey, new Buffer(message), {persistent: true});
    //   console.log(" [x] Sent %s: '%s'", routeKey, message);
    // });

    //setTimeout(function() { conn.close(); /*process.exit(0)*/ }, 500);
  });
};

exports.default = postMessage;
module.exports = exports['default'];
//# sourceMappingURL=communication.js.map
