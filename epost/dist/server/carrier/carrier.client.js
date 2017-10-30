'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _superagentBluebirdPromise = require('superagent-bluebird-promise');

var _superagentBluebirdPromise2 = _interopRequireDefault(_superagentBluebirdPromise);

var _api_easy = require('../helpers/api_easy');

var _api_easy2 = _interopRequireDefault(_api_easy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// require('superagent-proxy')(request);
// var proxy ='http://127.0.0.1:8888';
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var getCarrierTypes = async function getCarrierTypes() {
  try {
    return await _api_easy2.default.api().CarrierType.all(); // eslint-disable-line new-cap
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

var createChildUser = async function createChildUser(name) {
  try {
    var User = _api_easy2.default.api().User;
    var user = new User({ name: name });
    return await user.save();
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

var registerUpsAccount = function registerUpsAccount(apiKey, registrationData) {
  return _superagentBluebirdPromise2.default.post('https://www.easypost.com/api/v2/ups_registrations').set('Content-Type', 'application/json').auth(apiKey).send({ ups_registration: registrationData })
  // .proxy(proxy)
  .then(function (r) {
    return { result: 'OK', response: r };
  }).catch(console.log);
};
// {
//  "ups_registration":{
//     "account_number":"54R36W",
//     "user_id":"ralvarez@magaya.com",
//     "password":"M@g@y@33166",
//     "name":"John Doe",
//     "email":"al1.312@gmail.com",
//     "phone":"543543543",
//     "company":"Mgy 123",
//     "website":"http://comp1123.com",
//     "title":"CTO",
//     "street1":"77 W 30th St",
//     "street2":"",
//     "city":"Miami",
//     "state":"Fl",
//     "postal_code":"33123",
//     "country":"US"
//  }
// }

var createCarrierAccount = async function createCarrierAccount(account, carrierData) {
  if (carrierData.carrierType === 'UpsAccount') {
    return registerUpsAccount(account.prodApiKey, carrierData.credentials);
  }

  var credentialField = carrierData.testMode ? 'test_credentials' : 'credentials';
  var apiKey = carrierData.testMode ? account.testApiKey : account.prodApiKey;

  var CarrierAccount = _api_easy2.default.api(apiKey).CarrierAccount;
  var ca = new CarrierAccount(_defineProperty({
    type: carrierData.carrierType,
    description: carrierData.description,
    reference: carrierData.reference
  }, credentialField, carrierData.credentials));

  return await ca.save();
};

exports.default = { getCarrierTypes: getCarrierTypes, createCarrierAccount: createCarrierAccount, createChildUser: createChildUser };
module.exports = exports['default'];
//# sourceMappingURL=carrier.client.js.map
