import {SET_ACCOUNT_STATE,RESET_ACCOUNT_STATE} from './types'
import Mutator from './mutator'

const INITIAL_STATE  = {
  _id: null,
  birthday: null,
  email: null,
  firstName: null,
  lastName: null,
  license: null,
  phone: null,
  status: null,
  type: null,
  createdAt: null,
  activeOrder: null,
  loadingActiveOrder: false,
  preferedPayment: 'cash'
}

const ACTIONS_MAP = {
  [SET_ACCOUNT_STATE]: Mutator.setState,
  [RESET_ACCOUNT_STATE]: () => Mutator.setState(INITIAL_STATE )
}

export default (state = INITIAL_STATE , { type, ...props }) => {
  const mutateState = ACTIONS_MAP[type]
  const nextState = mutateState
    ? mutateState(state, props)
    : state

  return nextState || state
}
