// 采用 currying 实现不全classnames

export function _prefix(classPrefix){
  return (className) => classPrefix ? `${classPrefix}-${className}` : className;
}

// doc:
// prefix('ilex')('ray')
// return: ilex-ray
const prefix = (classPrefix) => (className) => classPrefix ? `${classPrefix}-${className}` : className;
export default prefix;
