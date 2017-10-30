'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shipment = require('./shipment.client');

var _shipment2 = _interopRequireDefault(_shipment);

var _account = require('../account/account.model');

var _account2 = _interopRequireDefault(_account);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _communication = require('../helpers/communication');

var _communication2 = _interopRequireDefault(_communication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createShipment = async function createShipment(req, res, next) {
  var logisticoId = req.body.logisticoAccountId;
  try {
    var account = await _account2.default.findByLogisticoId(logisticoId);
    if (!account) {
      return next(new _APIError2.default('Not user found for Logistico Account'));
    }

    var shipment = await _shipment2.default.createShipment(account.prodApiKey, req.body);
    return res.json(shipment);
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

var buyShipment = async function buyShipment(req, res, next) {
  var logisticoId = req.body.logisticoAccountId;
  try {
    var account = await _account2.default.findByLogisticoId(logisticoId);
    if (!account) {
      return next(new _APIError2.default('Not user found for Logistico Account'));
    }

    var shipment = await _shipment2.default.buyShipment(account.prodApiKey, req.body);
    (0, _communication2.default)('magento2_shipment', JSON.stringify(shipment));
    return res.json(shipment);
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

var sendMessage = function sendMessage(req, res, next) {
  (0, _communication2.default)('magento2', 'direct', 'shipment', 'hello');
  return res.json({ result: 'OK' });
};

exports.default = { createShipment: createShipment, buyShipment: buyShipment, sendMessage: sendMessage };
module.exports = exports['default'];
//# sourceMappingURL=shipment.controller.js.map
