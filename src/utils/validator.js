/** 校验布尔值 */
export function CheckBoolean(tips = '') {
  return function (rule, value, callback) {
    value ? callback() : callback(new Error(tips))
  }
}
