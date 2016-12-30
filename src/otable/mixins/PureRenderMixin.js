import simpleCompare from './../utils/simpleCompare';

/**
 * Mixin比较器,用于浅层次判断是否需要重新渲染组件
 * 使用方式:
 *  import {PureRenderMixin} from 'yeeAmos';
 *   shouldComponentUpdate(nextProps, nextState) {
 *      return  PureRenderMixin.shouldComponentUpdate.call(this, nextProps, nextState);
 *    }
 *
 *   或者：
 *   shouldComponentUpdate(...args) {
 *    return  PureRenderMixin.shouldComponentUpdate.apply(this, args);
 *   }
 * @author ilex
 */
const PureRenderMixin = {
  shouldComponentUpdate: function(nextProps, nextState) {
    return simpleCompare(this, nextProps, nextState);
  }
};

export default PureRenderMixin;
