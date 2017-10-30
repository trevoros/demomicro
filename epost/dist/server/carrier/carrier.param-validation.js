'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  // POST /api/carriers/account
  createCarrierAccount: {
    body: {
      logisticoAccountId: _joi2.default.string().guid().required(),
      credentials: _joi2.default.required(),
      carrierType: _joi2.default.string().required(),
      description: _joi2.default.string(),
      reference: _joi2.default.string()
      // accountNumber: Joi.string().required(),
      // userId: Joi.string().required(),
      // password: Joi.string().required(),
      // description: Joi.string(),
      // reference: Joi.string(),
      // accessLicenseNumber: Joi.string()
    }
  }
};
module.exports = exports['default'];
//# sourceMappingURL=carrier.param-validation.js.map
