'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('@easypost/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = new _api2.default('j58SufRJD3dBmrf1N29p0w');

var getCarrierTypes = async function getCarrierTypes() {
  try {
    return await api.CarrierType.all(); // eslint-disable-line new-cap
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

var createChildUser = async function createChildUser(name) {
  try {
    var user = new api.User({ name: name });
    return await user.save();
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

var createCarrierAccount = async function createCarrierAccount(apiKey, carrierData) {
  var ca = new api.CarrierAccount({
    type: carrierData.carrierType, // 'UpsAccount',
    description: carrierData.description, // 'NY Location UPS Account',
    reference: carrierData.reference, // 'my-reference',
    credentials: carrierData.credentials
    // credentials: {
    //   account_number: carrierData.accountNumber,  // 'A1A1A1',
    //   user_id: carrierData.userId,  // 'USERID',
    //   password: carrierData.password,  // 'PASSWORD',
    //   access_license_number: carrierData.licenseNumber,  //'ALN'
    // }
  });

  return await ca.save();
};

exports.default = { getCarrierTypes: getCarrierTypes, createCarrierAccount: createCarrierAccount, createChildUser: createChildUser };
module.exports = exports['default'];
//# sourceMappingURL=carrier.client.js.map
