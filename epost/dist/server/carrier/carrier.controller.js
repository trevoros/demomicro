'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _carrier = require('./carrier.client');

var _carrier2 = _interopRequireDefault(_carrier);

var _account = require('../account/account.model');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCarrierTypes = async function getCarrierTypes(req, res, next) {
  return _carrier2.default.getCarrierTypes().then(function (carriers) {
    return res.json(carriers);
  }).catch(function (e) {
    return next(e);
  });
};

var createAccount = async function createAccount(req, res, next) {
  var logisticoId = req.body.logisticoAccountId;
  try {
    var account = await _account2.default.findByLogisticoId(logisticoId);
    if (!account) {
      var childUser = await _carrier2.default.createChildUser('Log ' + logisticoId);
      var apiKeys = childUser.api_keys;
      var prodApiKey = apiKeys.find(function (a) {
        return a.mode === 'production';
      }).key;
      var testApiKey = apiKeys.find(function (a) {
        return a.mode === 'test';
      }).key;
      account = new _account2.default({
        logisticoAccountId: logisticoId,
        userId: childUser.id,
        prodApiKey: prodApiKey,
        testApiKey: testApiKey
      });
      await _account2.default.create(account);
    }

    var carrierAccount = await _carrier2.default.createCarrierAccount(account, req.body);
    return res.json(carrierAccount);
  } catch (e) {
    return next(e);
  }
};

exports.default = { getCarrierTypes: getCarrierTypes, createAccount: createAccount };
module.exports = exports['default'];
//# sourceMappingURL=carrier.controller.js.map
