import 'regenerator-runtime/runtime';

export default function requestPublicMiddleware({ dispatch, getState }) {
  return (next) => async (action) => {
    if (action.public === true) {
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
