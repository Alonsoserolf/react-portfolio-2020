import { combineReducers } from 'redux'
import account from './account/reducer'
//middlewares
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import createCompressor from 'redux-persist-transform-compress'

// const compressor = createCompressor()
// const { localStorageVersion } = process.env
// const commonPersisConfigs = {
  // storage,
  // version: localStorageVersion,
  // transforms: [compressor],
//   debug: !process.env.isProd
// }

const rootReducer = combineReducers({
  account
})

export default rootReducer
