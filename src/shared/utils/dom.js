import { Alert } from 'rsuite'
import { get } from 'lodash'
import axios from 'axios'

export function handleError(error, showAlert, duration) {
  reportError({ error })
  if (!process.env.isProd) {
    console.error(error)
  }

  const errorMessage = get(error, 'response.data.message', error.message)

  if (showAlert) {
    Alert.error(errorMessage || JSON.stringify(error), duration)
  }
}

export function reportError({ error, additional }) {
  return axios.post(`/api/v1/reporting/error`, { error, additional })
}

export function hasWindow() {
  return typeof(window) !== 'undefined'
}

export function detectMobile() {
  return window
    ? window.innerWidth <= 765
    : false
}

export function reloadWindow() {
  window.location.reload()
}

export const downloadFile = (data, filename) => {
  const url = window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
}
