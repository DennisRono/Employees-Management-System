import { configureStore } from '@reduxjs/toolkit'
import dashTabReducer from './slices/dashtabSlice'
import cacheReducer from './slices/cacheSlice'
import identityReducer from './slices/identitySlice'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from './useWebStorage'

const persistConfig = {
  key: 'root',
  storage,
}

const allReducers = combineReducers({
  dashtab: dashTabReducer,
  cache: cacheReducer,
  identity: identityReducer,
})

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = configureStore({
  reducer: persistedReducer,
  devTools: 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export default store
