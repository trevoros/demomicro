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

    var shipment = await _shipment2.default.createShipment(getAccountApiKey(account, req.body.testMode), req.body);
    return res.json(shipment);
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

var getAccountApiKey = function getAccountApiKey(account, testMode) {
  return testMode ? account.testApiKey : account.prodApiKey;
};

var buyShipment = async function buyShipment(req, res, next) {
  var logisticoId = req.body.logisticoAccountId;
  try {
    var account = await _account2.default.findByLogisticoId(logisticoId);
    if (!account) {
      return next(new _APIError2.default('Not user found for Logistico Account'));
    }

    var shipment = await _shipment2.default.buyShipment(getAccountApiKey(account, req.body.testMode), req.body);
    (0, _communication2.default)('magento2_shipment', JSON.stringify(createMessage(req.body, shipment)));
    return res.json(shipment);
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

var createMessage = function createMessage(body, shipment) {
  var result = {};
  result.shippingLabel = shipment.postage_label.label_pdf_url;
  result.orderId = body.orderId;
  result.items = body.items;
  result.comments = body.comments;

  result.tracks = body.tracks.map(function (track) {
    return {
      order_id: body.orderId,
      qty: body.qty,
      description: track.description,
      title: track.title,
      carrier_code: shipment.selected_rate.carrier,
      track_number: shipment.tracking_code
    };
  });

  return { entity: result };
};

exports.default = { createShipment: createShipment, buyShipment: buyShipment };
module.exports = exports['default'];
//# sourceMappingURL=shipment.controller.js.map
