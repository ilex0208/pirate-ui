"use strict";function simpleCompare(e,t,o){return!simpleEqual(e.props,t)||!simpleEqual(e.state,o)}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};exports.default=simpleCompare;var simpleEqual=exports.simpleEqual=function(e,t){if(e===t)return!0;if("object"!==("undefined"==typeof e?"undefined":_typeof(e))||null===e||"object"!==("undefined"==typeof t?"undefined":_typeof(t))||null===t)return!1;var o=Object.keys(e),n=Object.keys(t);if(o.length!==n.length)return!1;for(var r=hasOwnProperty.bind(t),u=0;u<o.length;u++)if(!r(o[u])||e[o[u]]!==t[o[u]])return!1;return!0};