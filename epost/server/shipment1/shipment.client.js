import httpStatus from 'http-status';
import api from '../helpers/api_easy';
import APIError from '../helpers/APIError';

const createShipment = async (apiKey, shipmentData) => {
  const toAddress = shipmentData.toAddress;
  const fromAddress = shipmentData.fromAddress;
  const parcel = shipmentData.parcel;
  const carrierAccounts = shipmentData.carrierAccounts;

  const Shipment = api(apiKey).Shipment;
  const shipment = new Shipment({
    to_address: toAddress,
    from_address: fromAddress,
    parcel,
    carrier_accounts: carrierAccounts
  });

  return await shipment.save();
};

const buyShipment = async (apiKey, shipmentData) => {
  const shipmentId = shipmentData.shipmentId;
  let rate = shipmentData.rate;

  const Shipment = api(apiKey).Shipment;
  const shipment = await Shipment.retrieve(shipmentId);
  if (!shipment) {
    const err = new APIError('ShipmentId not found', httpStatus.NOT_FOUND);
    throw err;
  }

  if (!rate) {
    rate = shipment.lowestRate();
  }

  return await shipment.buy(rate);
};

export default { createShipment, buyShipment };
