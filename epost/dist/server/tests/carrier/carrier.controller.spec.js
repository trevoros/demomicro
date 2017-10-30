'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _carrier = require('../../carrier/carrier.controller');

var _carrier2 = _interopRequireDefault(_carrier);

var _carrier3 = require('../../carrier/carrier.client');

var _carrier4 = _interopRequireDefault(_carrier3);

var _account = require('../../account/account.model');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.config.includeStack = true;

describe('# Carrier Controller', function () {
  describe('# GET /api/carriers/types', function () {
    var sandbox = void 0;
    beforeEach(function () {
      sandbox = _sinon2.default.sandbox.create();
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('Should return all Carriers', async function () {
      var result = {};
      var resp = { json: function json(obj) {
          result = obj;
        } };
      var carriers = [{ name: 'UPS', id: 'ups' }, { name: 'Fedex', id: 'fedex' }, { name: 'USPS', id: 'usps' }];
      sandbox.stub(_carrier4.default, 'getCarrierTypes').resolves(carriers);

      await _carrier2.default.getCarrierTypes({}, resp, {});

      (0, _chai.expect)(result).to.deep.equal(carriers);
    });

    it('Should return empty list if no carriers', async function () {
      var result = {};
      var resp = { json: function json(obj) {
          result = obj;
        } };
      var carriers = [];
      sandbox.stub(_carrier4.default, 'getCarrierTypes').resolves(carriers);

      await _carrier2.default.getCarrierTypes({}, resp, {});

      (0, _chai.expect)(result).to.deep.equal(carriers);
    });

    it('Should call next function if any exception', async function () {
      var errorMessage = '';
      var next = function next(e) {
        errorMessage = e.message;
      };

      sandbox.stub(_carrier4.default, 'getCarrierTypes').rejects(new Error('Error getting the carriers'));

      await _carrier2.default.getCarrierTypes({}, {}, next);

      (0, _chai.expect)(errorMessage).to.equal('Error getting the carriers');
    });
  });

  describe('# POST /api/carriers/account', function () {
    var sandbox = void 0;
    beforeEach(function () {
      sandbox = _sinon2.default.sandbox.create();
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('Should create carrier account if user exists', async function () {
      var account = { prodApiKey: '123456' };
      var carrierAccount = { accountId: 'ca_123', carrier: 'FedEx' };
      var res = { json: function json(obj) {
          return obj;
        } };
      var req = { body: { logisticoId: '12345' } };

      sandbox.stub(_account2.default, 'findByLogisticoId').resolves(account);
      sandbox.stub(_carrier4.default, 'createCarrierAccount').resolves(carrierAccount);

      var result = await _carrier2.default.createAccount(req, res, {});
      console.log(result);
      (0, _chai.expect)(result).to.equal(carrierAccount);
    });
  });
});
//# sourceMappingURL=carrier.controller.spec.js.map
