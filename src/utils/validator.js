/** 校验布尔值是否为真 */
export function CheckBoolean(tips = '') {
  return function (rule, value, callback) {
    value ? callback() : callback(new Error(tips))
  }
}

/** 校验两次输入值是否一致 */
export const CheckRepeat = (target, tips = '') => {
  return (rule, value, callback) => {
    target === value ? callback() : callback(tips)
  }
}
