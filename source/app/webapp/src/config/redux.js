import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { utils } from '@main';
import { reducers as mainReducers } from '@main';
import requestPublicMiddleware from '@main/middleware/requestPublicMiddleware';
import responsePublicMiddleware from '@main/middleware/responsePublicMiddleware';
import requestAuthenticatedMiddleware from '@main/middleware/requestAuthenticatedMiddleware';
import responseAuthenticatedMiddleware from '@main/middleware/responseAuthenticatedMiddleware';
import DevTools from '@main/devTools/DevTools';

// Usually you import the reducer from the monitor
// or apply with createDevTools as explained in Redux DevTools
const monitorReducer = (state = {}, action) => state;

export default function createReduxStore(services) {
  // Combine modules reducers together
  const reducer = combineReducers({
    ...mainReducers,
  });

  // Create a logger instance
  let initialState = utils.getLocalStorageStore();

  console.log('[REDUX] local storage store is:', initialState);

  // Create Redux store with middlewares
  let store;
  if (process.env.STAGE === 'dev') {
    // add redux dev tools
    return createStore(
      reducer,
      initialState,
      compose(
        applyMiddleware(
          requestPublicMiddleware,
          requestAuthenticatedMiddleware,
          thunk.withExtraArgument(services),
          responsePublicMiddleware,
          responseAuthenticatedMiddleware,
          utils.syncLocalStorageMiddleware
        ),
        DevTools.instrument({
          maxAge: 15, // maximum allowed actions to be stored on the history tree
          shouldCatchErrors: true, // if specified as true, whenever there's an exception in reducers, the monitors will show the error message, and next actions will not be dispatched.
          shouldRecordChanges: true, // if specified as false, it will not record the changes till pauseRecording(false) is dispatched
          pauseActionType: true, // if specified as true, it will not allow any non-monitor actions to be dispatched till lockChanges(false) is dispatched.
          shouldHotReload: true, // if set to false, will not recompute the states on hot reloading (or on replacing the reducers).
          trace: true, // if set to true, will include stack trace for every dispatched action.
          traceLimit: 15, // maximum stack trace frames to be stored (in case trace option was provided as true).
        })
      )
    );
  } else {
    store = createStore(
      reducer,
      initialState,
      compose(
        applyMiddleware(
          requestPublicMiddleware,
          requestAuthenticatedMiddleware,
          thunk.withExtraArgument(services),
          responsePublicMiddleware,
          responseAuthenticatedMiddleware,
          utils.syncLocalStorageMiddleware
        )
      )
    );
  }
  return store;
}
