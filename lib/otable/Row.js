"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}function _inherits(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(r,t,o){return t&&e(r.prototype,t),o&&e(r,o),r}}(),_react=require("react"),_react2=_interopRequireDefault(_react),_classnames=require("classnames"),_classnames2=_interopRequireDefault(_classnames),_prefix=require("./_prefix"),_prefix2=_interopRequireDefault(_prefix),Row=function(e){function r(){return _classCallCheck(this,r),_possibleConstructorReturn(this,(r.__proto__||Object.getPrototypeOf(r)).apply(this,arguments))}return _inherits(r,e),_createClass(r,[{key:"render",value:function(){var e=this.props,r=e.children,t=e.className,o=e.width,a=e.height,n=e.top,s=e.style,i=e.isHeaderRow,c=e.headerHeight,p=e.classPrefix,l=(0,_classnames2.default)((0,_prefix2.default)(p)("row"),i?(0,_prefix2.default)(p)("row-header"):"",t),u=Object.assign({minWidth:o,height:i?c:a,top:n},s);return _react2.default.createElement("div",{className:l,style:u},r)}}]),r}(_react.Component);Row.propTypes={width:_react.PropTypes.number,height:_react.PropTypes.number,headerHeight:_react.PropTypes.number,top:_react.PropTypes.number,style:_react.PropTypes.object,isHeaderRow:_react.PropTypes.bool,classPrefix:_react.PropTypes.string,children:_react.PropTypes.any,className:_react.PropTypes.any},Row.defaultProps={classPrefix:"ray-table",height:36,headerHeight:36,isHeaderRow:!1},exports.default=Row;