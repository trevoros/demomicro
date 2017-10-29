import express from 'express';
import validate from 'express-validation';
import paramValidation from './shipment.param-validation';
import shipmentCtrl from './shipment.controller';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/create')

  /** POST /api/shipments/create - Create a shipment */
  .post(validate(paramValidation.createShipment), shipmentCtrl.createShipment);

router.route('/buy')
    /** POST /api/shipments/buy - Buy a shipment */
  .post(validate(paramValidation.buyShipment), shipmentCtrl.buyShipment);

  
router.route('/send-message')
  /** POST /api/shipments/buy - Buy a shipment */
  .post(shipmentCtrl.sendMessage);

export default router;
