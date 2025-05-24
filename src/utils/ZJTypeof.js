/** 判断变量类型 */

export function isNumber(value) {
  return Object.prototype.toString.call(value) === '[object Number]'
}

export function isString(value) {
  return Object.prototype.toString.call(value) === '[object String]'
}

export function isBoolean(value) {
  return Object.prototype.toString.call(value) === '[object Boolean]'
}

export function isNull(value) {
  return Object.prototype.toString.call(value) === '[object Null]'
}

export function isUndefined(value) {
  return Object.prototype.toString.call(value) === '[object Undefined]'
}

export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}

export function isDate(data) {
  return Object.prototype.toString.call(data) === '[object Date]'
}

export function isRegExp(value) {
  return Object.prototype.toString.call(value) === '[object RegExp]'
}

export function isSet(value) {
  return Object.prototype.toString.call(value) === '[object Set]'
}

export function isMap(value) {
  return Object.prototype.toString.call(value) === '[object Map]'
}
