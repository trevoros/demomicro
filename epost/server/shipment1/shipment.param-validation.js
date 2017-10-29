import Joi from 'joi';

export default {
  // POST /api/shipment/create
  createShipment: {
    body: {
      logisticoAccountId: Joi.string().guid().required(),
      toAddress: {
        id: Joi.string(),
        name: Joi.string().required(),
        company: Joi.string().allow(null),
        street1: Joi.string().required(),
        street2: Joi.string().allow(null),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().required(),
        country: Joi.string().required(),
        phone: Joi.string(),
        email: Joi.string().email(),
        residential: Joi.bool().allow(null)
      },
      fromAddress: {
        id: Joi.string(),
        name: Joi.string().required(),
        company: Joi.string().allow(null),
        street1: Joi.string().required(),
        street2: Joi.string().allow(null),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().required(),
        country: Joi.string().required(),
        phone: Joi.string(),
        email: Joi.string().email(),
        residential: Joi.bool().allow(null)
      },
      parcel: {
        length: Joi.number().allow(null),
        width: Joi.number().allow(null),
        height: Joi.number().allow(null),
        weight: Joi.number().required()
      },
      carrierAccounts: Joi.array()
    }
  },
  buyShipment: {
    logisticoAccountId: Joi.string().guid().required(),
    shipmentId: Joi.string().allow(null),
    rate: {
      id: Joi.string().required(),
      mode: Joi.string().allow(null), // Production
      service: Joi.string().allow(null), // "Ground",
      carrier: Joi.string().allow(null), // "UPS",
      rate: Joi.number().allow(null), // "12.75",
      currency: Joi.string().allow(null), // "USD",
      retail_rate: Joi.number().allow(null), // "12.75",
      retail_currency: Joi.string().allow(null), // "USD",
      list_rate: Joi.number().allow(null), // "12.00",
      list_currency: Joi.string().allow(null), // "USD",
      delivery_days: Joi.number().allow(null), // 2,
      delivery_date: Joi.date().allow(null), // "2017-10-11T23:00:00Z",
      delivery_date_guaranteed: Joi.bool().allow(null), // true,
      est_delivery_days: Joi.number().allow(null), // null,
      shipment_id: Joi.string().allow(null), // "shp_acf375230d44453eaa30cd8eb9f41a2e",
      carrier_account_id: Joi.string().allow(null) // "ca_9326b005b60a4b03a07ffafec6105280"
    }
  }
};
