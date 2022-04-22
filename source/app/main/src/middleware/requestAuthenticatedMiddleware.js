import 'regenerator-runtime/runtime';

export default function requestAuthenticatedMiddleware({ dispatch, getState }) {
  return (next) => async (action) => {
    if (!action) return false;
    if (action.authenticated === true) {
      return next({
        ...action,
        payload: action.call({
          ...action.params,
        }),
      });
    }
    return next(action);
  };
}
