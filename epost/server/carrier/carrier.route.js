import express from 'express';
import validate from 'express-validation';
import paramValidation from './carrier.param-validation';
import carrierCtrl from './carrier.controller';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/types')

  /** GET /api/carriers/types - Get list of carrier types */
  .get(carrierCtrl.getCarrierTypes);

router.route('/account')

  /** POST /api/cariers/account - Create new carrier account */
  .post(validate(paramValidation.createCarrierAccount), carrierCtrl.createAccount);

export default router;

