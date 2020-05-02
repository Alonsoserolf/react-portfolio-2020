import TYPES from './types'
import axios from 'axios'
import LogRocket from 'logrocket'
import { Alert } from 'rsuite'
import { validatePhone } from 'shared/utils/validators'
import { saveToStorage, getFromStorage } from 'shared/utils/local-storage'
import { handleError } from 'lib/dom'
import { tryNiceAsync } from 'try-nice'
import { get } from 'lodash'
import { objToFormData, getFullName } from 'shared/utils/common'
import Analytics from 'lib/analytics'

export const setAccountState = (newState) => {
  return {
    type: TYPES.SET_ACCOUNT_STATE,
    newState
  }
}

export const resetAccountState = () => {
  return {
    type: TYPES.RESET_ACCOUNT_STATE
  }
}

export const signOut = () => {
  return async dispatch => {
    axios.post('/api/v1/account/signout')
    dispatch(resetAccountState())
  }
}

export const signIn = ({ username, password }) => {
  return async dispatch => {
    const [, error] = await tryNiceAsync(async () => {
      username = validatePhone(username) || username
      const { data } = await axios.post('/api/v1/customers/login', { username, password })
      dispatch(setAccountState({ token: data }))
    })

    error && handleError(error, true)
  }
}

export const getAccountData = () => {
  return async dispatch => {
    dispatch(setAccountState({ loading: true }))
    const [, error] = await tryNiceAsync(async () => {
      const { data } = await axios.get('/api/v1/customers/self')
      dispatch(setAccountState(data))
      dispatch(getActiveOrder())
      Analytics.logUser(data)
      LogRocket.identify(data._id, {
        name: getFullName(data),
        email: data.email,
        phone: data.phone,
        status: data.status
      })
    })

    dispatch(setAccountState({ loading: false }))
    error && handleError(error, true)
  }
}

export const register = (props) => {
  return async dispatch => {
    const [, error] = await tryNiceAsync(async () => {
      const payload = objToFormData(props)
      await axios.post('/api/v1/customers/register', payload)
      dispatch(signIn({ username: props.email, password: props.password }))
      Alert.success('Account created!')
    })

    error && handleError(error, true, 5 * 1000)
  }
}

export const getActiveOrder = () => {
  return async dispatch => {
    dispatch(setAccountState({ loadingActiveOrder: true }))
    const [activeOrder, error] = await tryNiceAsync(async () => {
      const { data } = await axios.get('/api/v1/customers/self/orders/active')
      if (!get(data, 'driver.location')) {
        const remnantDriver = getFromStorage({ key: 'remnantDriver' })
        if (remnantDriver && remnantDriver?.order === data._id) {
          data.driver = remnantDriver
        }
      } else {
        data.driver.order = data._id
        saveToStorage({ key: 'remnantDriver', value: data.driver })
      }

      return data
    })

    dispatch(setAccountState({ activeOrder }))
    dispatch(setAccountState({ loadingActiveOrder: false }))
    error && process.env.isProd && console.error(error)
  }
}

export const updateAccount = ({ type, gender }) => {
  return async dispatch => {
    dispatch(setAccountState({ loading: true }))
    const payload = { type, gender }
    const [, error] = await tryNiceAsync(axios.post, '/api/v1/customer/edit', payload)
    dispatch(setAccountState({ loading: false }))
    error && handleError(error, true)
  }
}

export const uploadDocuments = (customerId, license, type) => {
  return async dispatch => {
    dispatch(setAccountState({ loading: true }))
    const payload = objToFormData({ license, type })
    const [result, error] = await tryNiceAsync(axios.post, `/api/v1/customers/${customerId}/uploads`, payload)
    result && dispatch(setAccountState(result.data))
    error && handleError(error, true)
    dispatch(setAccountState({ loading: false }))
  }
}
