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

    const shipment = await ShipmentClient.createShipment(getAccountApiKey(account, req.body.testMode), req.body);
    return res.json(shipment);
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

const getAccountApiKey = (account, testMode) => testMode ? account.testApiKey : account.prodApiKey;

const buyShipment = async (req, res, next) => {
  const logisticoId = req.body.logisticoAccountId;
  try {
    const account = await Account.findByLogisticoId(logisticoId);
    if (!account) {
      return next(new ApiError('Not user found for Logistico Account'));
    }

    const shipment = await ShipmentClient.buyShipment(getAccountApiKey(account, req.body.testMode), req.body);
    postMessage('magento2_shipment', JSON.stringify(createMessage(req.body, shipment)));
    return res.json(shipment);
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

const createMessage = (body, shipment) => {
  let result = {};
  result.shippingLabel = shipment.postage_label.label_pdf_url;
  result.orderId = body.orderId;
  result.items = body.items;
  result.comments = body.comments;

  result.tracks = body.tracks.map((track) => ({
    order_id: body.orderId,
    qty: body.qty,
    description: track.description,
    title: track.title,
    carrier_code: shipment.selected_rate.carrier,
    track_number: shipment.tracking_code 
  }));

  return {entity: result};
};

export default { createShipment, buyShipment };
