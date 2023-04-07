import { routerMiddleware } from 'connected-react-router'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { sagaMiddleware } from './middleware'
import staticReducers, { history } from './reducers'
import staticSagas from './sagas'

const createReducer = (asyncReducers) => combineReducers({
    ...staticReducers,
    ...asyncReducers
  })

function createSagaInjector(runSaga, rootSaga) {
  const injectedSagas = new Map();
  const isInjected = (key) => injectedSagas.has(key)

  const injectSaga = (key, saga) => {
    if (isInjected(key)) return
    const task = runSaga(saga)
    injectedSagas.set(key, task)
  }
  injectSaga('root', rootSaga)
  return injectSaga
}

const configureStore = (preloadedState = {}) => {
  const middlewares = [sagaMiddleware, routerMiddleware(history)]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(createReducer(), preloadedState, composedEnhancers)

  store.asyncReducers = {}

  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }
  store.injectSaga = createSagaInjector(sagaMiddleware.run, staticSagas)

  return store
}
export default configureStore()
