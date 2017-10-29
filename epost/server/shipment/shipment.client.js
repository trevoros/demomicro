import httpStatus from 'http-status';
import EasyApi from '../helpers/api_easy';
import APIError from '../helpers/APIError';

const createShipment = async (apiKey, shipmentData) => {
  const toAddress = shipmentData.toAddress;
  const fromAddress = shipmentData.fromAddress;
  const parcel = shipmentData.parcel;
  const carrierAccounts = shipmentData.carrierAccounts;

  const Shipment = EasyApi.api(apiKey).Shipment;
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

  const Shipment = EasyApi.api(apiKey).Shipment;
  const shipment = await Shipment.retrieve(shipmentId);
  if (!shipment) {
    const err = new APIError('ShipmentId not found', httpStatus.NOT_FOUND);
    throw err;
  }

  if (!rate) {
    rate = shipment.lowestRate();
  }

  const shipmentBuyResult = await shipment.buy(rate);
  if (!shipmentData.labelFormat || shipmentData.labelFormat == "PNG") {
    return shipmentBuyResult;
  }

  return await shipment.convertLabelFormat(shipmentData.labelFormat);  
};

export default { createShipment, buyShipment };
