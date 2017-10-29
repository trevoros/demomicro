import Easypost from '@easypost/api';

const api = new Easypost('j58SufRJD3dBmrf1N29p0w');

const getCarrierTypes = async () => {
  try {
    return await api.CarrierType.all(); // eslint-disable-line new-cap
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

const createChildUser = async (name) => {
  try {
    const user = new api.User({ name });
    return await user.save();
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

const createCarrierAccount = async (apiKey, carrierData) => {
  const ca = new api.CarrierAccount({
    type: carrierData.carrierType, // 'UpsAccount',
    description: carrierData.description, // 'NY Location UPS Account',
    reference: carrierData.reference,  // 'my-reference',
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

export default { getCarrierTypes, createCarrierAccount, createChildUser };
