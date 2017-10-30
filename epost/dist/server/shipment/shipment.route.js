'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _shipment = require('./shipment.param-validation');

var _shipment2 = _interopRequireDefault(_shipment);

var _shipment3 = require('./shipment.controller');

var _shipment4 = _interopRequireDefault(_shipment3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap


router.route('/create')

/** POST /api/shipments/create - Create a shipment */
.post((0, _expressValidation2.default)(_shipment2.default.createShipment), _shipment4.default.createShipment);

router.route('/buy')
/** POST /api/shipments/buy - Buy a shipment */
.post((0, _expressValidation2.default)(_shipment2.default.buyShipment), _shipment4.default.buyShipment);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=shipment.route.js.map
