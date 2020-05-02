/**
 * @description This file is for handling local storage
 */

const hasWindow = typeof(window) !== 'undefined'
export const getFromStorage = ({ key, defaultValue, callback }) => {
  // If local storage exists and the requested key in it is truthy,
  // then use the result from local storage and Parse it.
  //.Otherwise, use the defaultValue provided in parameters.

  const itemFromStorage = hasWindow && window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : defaultValue

  if (typeof callback === 'function') {
    callback(itemFromStorage)
  }

  return itemFromStorage
}

export const saveToStorage = ({ key, value }) =>  {
  if (hasWindow) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

export const removeFromStorage = ({ key }) => {
  //Returns value of the removed item
  if (hasWindow) {
    localStorage.removeItem(key)
  }
}
