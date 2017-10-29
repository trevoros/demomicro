import ShipmentClient from './shipment.client';
import Account from '../account/account.model';
import ApiError from '../helpers/APIError';
import postMessage from '../helpers/communication';

const createShipment = async (req, res, next) => {
  const logisticoId = req.body.logisticoAccountId;
  try {
    const account = await Account.findByLogisticoId(logisticoId);
    if (!account) {
      return next(new ApiError('Not user found for Logistico Account'));
    }

    const shipment = await ShipmentClient.createShipment(account.prodApiKey, req.body);
    return res.json(shipment);
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

const buyShipment = async (req, res, next) => {
  const logisticoId = req.body.logisticoAccountId;
  try {
    const account = await Account.findByLogisticoId(logisticoId);
    if (!account) {
      return next(new ApiError('Not user found for Logistico Account'));
    }

    const shipment = await ShipmentClient.buyShipment(account.prodApiKey, req.body);
    postMessage('magento2_shipment', JSON.stringify(shipment));
    return res.json(shipment);
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

const sendMessage = (req, res, next) => {
    postMessage('magento2', 'direct', 'shipment', 'hello');
    return res.json({result: 'OK'});
};

export default { createShipment, buyShipment, sendMessage };
