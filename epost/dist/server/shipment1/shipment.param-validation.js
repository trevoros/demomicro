'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  // POST /api/shipment/create
  createShipment: {
    body: {
      logisticoAccountId: _joi2.default.string().guid().required(),
      toAddress: {
        id: _joi2.default.string(),
        name: _joi2.default.string().required(),
        company: _joi2.default.string().allow(null),
        street1: _joi2.default.string().required(),
        street2: _joi2.default.string().allow(null),
        city: _joi2.default.string().required(),
        state: _joi2.default.string().required(),
        zip: _joi2.default.string().required(),
        country: _joi2.default.string().required(),
        phone: _joi2.default.string(),
        email: _joi2.default.string().email(),
        residential: _joi2.default.bool().allow(null)
      },
      fromAddress: {
        id: _joi2.default.string(),
        name: _joi2.default.string().required(),
        company: _joi2.default.string().allow(null),
        street1: _joi2.default.string().required(),
        street2: _joi2.default.string().allow(null),
        city: _joi2.default.string().required(),
        state: _joi2.default.string().required(),
        zip: _joi2.default.string().required(),
        country: _joi2.default.string().required(),
        phone: _joi2.default.string(),
        email: _joi2.default.string().email(),
        residential: _joi2.default.bool().allow(null)
      },
      parcel: {
        length: _joi2.default.number().allow(null),
        width: _joi2.default.number().allow(null),
        height: _joi2.default.number().allow(null),
        weight: _joi2.default.number().required()
      },
      carrierAccounts: _joi2.default.array()
    }
  },
  buyShipment: {
    logisticoAccountId: _joi2.default.string().guid().required(),
    shipmentId: _joi2.default.string().allow(null),
    rate: {
      id: _joi2.default.string().required(),
      mode: _joi2.default.string().allow(null), // Production
      service: _joi2.default.string().allow(null), // "Ground",
      carrier: _joi2.default.string().allow(null), // "UPS",
      rate: _joi2.default.number().allow(null), // "12.75",
      currency: _joi2.default.string().allow(null), // "USD",
      retail_rate: _joi2.default.number().allow(null), // "12.75",
      retail_currency: _joi2.default.string().allow(null), // "USD",
      list_rate: _joi2.default.number().allow(null), // "12.00",
      list_currency: _joi2.default.string().allow(null), // "USD",
      delivery_days: _joi2.default.number().allow(null), // 2,
      delivery_date: _joi2.default.date().allow(null), // "2017-10-11T23:00:00Z",
      delivery_date_guaranteed: _joi2.default.bool().allow(null), // true,
      est_delivery_days: _joi2.default.number().allow(null), // null,
      shipment_id: _joi2.default.string().allow(null), // "shp_acf375230d44453eaa30cd8eb9f41a2e",
      carrier_account_id: _joi2.default.string().allow(null) // "ca_9326b005b60a4b03a07ffafec6105280"
    }
  }
};
module.exports = exports['default'];
//# sourceMappingURL=shipment.param-validation.js.map
