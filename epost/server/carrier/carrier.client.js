import request from 'superagent-bluebird-promise';
import EasyApi from '../helpers/api_easy';


// require('superagent-proxy')(request);
// var proxy ='http://127.0.0.1:8888';
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const getCarrierTypes = async () => {
  try {
    return await EasyApi.api().CarrierType.all(); // eslint-disable-line new-cap
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

const createChildUser = async (name) => {
  try {
    const User = EasyApi.api().User;
    const user = new User({ name });
    return await user.save();
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

const registerUpsAccount = (apiKey, registrationData) => request.post('https://www.easypost.com/api/v2/ups_registrations')
    .set('Content-Type', 'application/json')
    .auth(apiKey)
    .send({ ups_registration: registrationData })
    // .proxy(proxy)
    .then(r => ({ result: 'OK', response: r }))
    .catch(console.log);
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

const createCarrierAccount = async (account, carrierData) => {
  if (carrierData.carrierType === 'UpsAccount') {
    return registerUpsAccount(account.prodApiKey, carrierData.credentials);
  }

  const credentialField = carrierData.testMode ? 'test_credentials' : 'credentials';
  const apiKey = carrierData.testMode ? account.testApiKey : account.prodApiKey;

  const CarrierAccount = EasyApi.api(apiKey).CarrierAccount;
  const ca = new CarrierAccount({
    type: carrierData.carrierType,
    description: carrierData.description,
    reference: carrierData.reference,
    [credentialField]: carrierData.credentials
  });

  return await ca.save();
};

export default { getCarrierTypes, createCarrierAccount, createChildUser };
