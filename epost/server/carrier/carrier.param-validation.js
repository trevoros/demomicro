import Joi from 'joi';

export default {
  // POST /api/carriers/account
  createCarrierAccount: {
    body: {
      logisticoAccountId: Joi.string().guid().required(),
      credentials: Joi.required(),
      carrierType: Joi.string().required(),
      description: Joi.string(),
      reference: Joi.string()
      // accountNumber: Joi.string().required(),
      // userId: Joi.string().required(),
      // password: Joi.string().required(),
      // description: Joi.string(),
      // reference: Joi.string(),
      // accessLicenseNumber: Joi.string()
    }
  }
};
