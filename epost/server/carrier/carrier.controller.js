import CarrierClient from './carrier.client';
import Account from '../account/account.model';

const getCarrierTypes = async (req, res, next) =>
  CarrierClient.getCarrierTypes()
    .then(carriers => res.json(carriers))
    .catch(e => next(e));

const createAccount = async (req, res, next) => {
  const logisticoId = req.body.logisticoAccountId;
  try {
    let account = await Account.findByLogisticoId(logisticoId);
    if (!account) {
      const childUser = await CarrierClient.createChildUser(`Log ${logisticoId}`);
      const apiKeys = childUser.api_keys;
      const prodApiKey = apiKeys.find(a => a.mode === 'production').key;
      const testApiKey = apiKeys.find(a => a.mode === 'test').key;
      account = new Account({
        logisticoAccountId: logisticoId,
        userId: childUser.id,
        prodApiKey,
        testApiKey
      });
      await Account.create(account);
    }

    const carrierAccount = await CarrierClient.createCarrierAccount(account, req.body);
    return res.json(carrierAccount);
  } catch (e) {
    return next(e);
  }
};


export default { getCarrierTypes, createAccount };
