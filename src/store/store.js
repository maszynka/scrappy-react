import { /*applyMiddleware, */createStore } from 'redux'
// import { wrapStore, alias } from 'webext-redux'
// import { createLogger } from 'redux-logger'
// import thunk from 'redux-thunk'

// import aliases from './aliases'
import app from './reducers'


/*const logger = createLogger({
  collapsed: true
})*/

const initialStoredState = {
  //TODO: Get stored state
}

const store = createStore(
  app,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
  /*applyMiddleware(
    // alias(aliases),
    // thunk ,
    // logger // NOTE: logger _must_ be last in middleware chain
  ),*/

/*wrapStore(store, {
  portName: 'BOOKMARKSAVER'
})*/

export default store