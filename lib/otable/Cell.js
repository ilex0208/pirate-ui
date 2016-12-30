"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}function _inherits(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,r){for(var t=0;t<r.length;t++){var a=r[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(r,t,a){return t&&e(r.prototype,t),a&&e(r,a),r}}(),_react=require("react"),_react2=_interopRequireDefault(_react),_classnames=require("classnames"),_classnames2=_interopRequireDefault(_classnames),_prefix=require("./_prefix"),_prefix2=_interopRequireDefault(_prefix),LAYER_WIDTH=30,Cell=function(e){function r(e){_classCallCheck(this,r);var t=_possibleConstructorReturn(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,e));return t.renderCell=function(e){var r=t.props,a=r.width,l=r.left,n=r.height,o=r.style,s=r.className,c=r.firstColumn,i=r.lastColumn,p=r.isHeaderCell,u=r.headerHeight,f=r.layer,_=r.onTreeToggle,y=r.hasChildren,d=r.rowIndex,h=r.rowKey,b=r.align,m=r.sortable,P=r.classPrefix,T=(0,_classnames2.default)((0,_prefix2.default)(P)("cell"),s,{sortable:m&&p,first:c,last:i}),g=f*LAYER_WIDTH;a=!p&&c?a-g:a;var C=Object.assign({height:p?u:n,zIndex:f,width:a,left:!p&&c?l+g:l},o),w={width:a,textAlign:b};m&&(w.paddingRight=28);var x=y&&c?_react2.default.createElement("i",{className:"expand-icon fa fa-min",onClick:function(e){return _(h,d,e)}}):null,v=_react2.default.createElement("div",{className:(0,_prefix2.default)(P)("cell-content"),style:w},x,e);return _react2.default.createElement("div",{className:T,style:C},_react2.default.createElement("div",{className:(0,_prefix2.default)(P)("cell-wrap1")},_react2.default.createElement("div",{className:(0,_prefix2.default)(P)("cell-wrap2")},_react2.default.createElement("div",{className:(0,_prefix2.default)(P)("cell-wrap3")},v))))},t}return _inherits(r,e),_createClass(r,[{key:"render",value:function(){var e=this.props,r=e.children,t=e.rowData,a=e.isHeaderCell,l=e.dataKey;return a?this.renderCell(r):this.renderCell(r||t[l])}}]),r}(_react.Component);Cell.propTypes={dataKey:_react.PropTypes.string,align:_react.PropTypes.oneOf(["left","center","right"]),className:_react.PropTypes.string,isHeaderCell:_react.PropTypes.bool,width:_react.PropTypes.number,height:_react.PropTypes.number,left:_react.PropTypes.number,headerHeight:_react.PropTypes.number,rowData:_react.PropTypes.object,rowIndex:_react.PropTypes.number,cellData:_react.PropTypes.any,cellRenderer:_react.PropTypes.func,fixed:_react.PropTypes.bool,style:_react.PropTypes.object,firstColumn:_react.PropTypes.bool,lastColumn:_react.PropTypes.bool,hasChildren:_react.PropTypes.bool,onTreeToggle:_react.PropTypes.func,layer:_react.PropTypes.any,children:_react.PropTypes.any,classPrefix:_react.PropTypes.string,rowKey:_react.PropTypes.string,sortable:_react.PropTypes.any},Cell.defaultProps={classPrefix:"ray-table",align:"left",headerHeight:36,height:36},exports.default=Cell;