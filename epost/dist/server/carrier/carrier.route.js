'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _carrier = require('./carrier.param-validation');

var _carrier2 = _interopRequireDefault(_carrier);

var _carrier3 = require('./carrier.controller');

var _carrier4 = _interopRequireDefault(_carrier3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap


router.route('/types')

/** GET /api/carriers/types - Get list of carrier types */
.get(_carrier4.default.getCarrierTypes);

router.route('/account')

/** POST /api/cariers/account - Create new carrier account */
.post((0, _expressValidation2.default)(_carrier2.default.createCarrierAccount), _carrier4.default.createAccount);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=carrier.route.js.map
