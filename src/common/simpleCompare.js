/**
 * 浅层次比较两个对象是否相等
 * @param {object} objA
 * @param {object} objB
 */
export const simpleEqual = (objA, objB) => {
  if (objA === objB) {
    return true;
  }
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  // Test for objA's keys different from objB.
  var bHasOwnProperty = hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }
  return true;
};

/**
 *
 * 针对props and state 做的浅层次比较
 * @export
 * @param {any} instance 当前类
 * @param {any} nextProps
 * @param {any} nextState
 * @returns
 */
export default function simpleCompare(instance, nextProps, nextState) {
  return !simpleEqual(instance.props, nextProps) || !simpleEqual(instance.state, nextState);
}
