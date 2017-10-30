'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _api_easy = require('../helpers/api_easy');

var _api_easy2 = _interopRequireDefault(_api_easy);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createShipment = async function createShipment(apiKey, shipmentData) {
  var toAddress = shipmentData.toAddress;
  var fromAddress = shipmentData.fromAddress;
  var parcel = shipmentData.parcel;
  var carrierAccounts = shipmentData.carrierAccounts;

  var Shipment = (0, _api_easy2.default)(apiKey).Shipment;
  var shipment = new Shipment({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel,
    carrier_accounts: carrierAccounts
  });

  return await shipment.save();
};

var buyShipment = async function buyShipment(apiKey, shipmentData) {
  var shipmentId = shipmentData.shipmentId;
  var rate = shipmentData.rate;

  var Shipment = (0, _api_easy2.default)(apiKey).Shipment;
  var shipment = await Shipment.retrieve(shipmentId);
  if (!shipment) {
    var err = new _APIError2.default('ShipmentId not found', _httpStatus2.default.NOT_FOUND);
    throw err;
  }

  if (!rate) {
    rate = shipment.lowestRate();
  }

  return await shipment.buy(rate);
};

exports.default = { createShipment: createShipment, buyShipment: buyShipment };
module.exports = exports['default'];
//# sourceMappingURL=shipment.client.js.map
