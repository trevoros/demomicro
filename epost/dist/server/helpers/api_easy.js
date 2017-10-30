'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('@easypost/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = function api() {
  var apiKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'j58SufRJD3dBmrf1N29p0w';
  return new _api2.default(apiKey);
};

exports.default = { api: api };
module.exports = exports['default'];
//# sourceMappingURL=api_easy.js.map
