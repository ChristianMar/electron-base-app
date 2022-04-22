export const types = {
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_SESSION_TOKEN_LOADING: 'AUTH_SESSION_TOKEN_LOADING',
  AUTH_SESSION_TOKEN_SUCCESS: 'AUTH_SESSION_TOKEN_SUCCESS',
  AUTH_SESSION_TOKEN_ERROR: 'AUTH_SESSION_TOKEN_ERROR',
  AUTH_PRISTINE: 'AUTH_PRISTINE',
  RESET_STATE: 'RESET_STATE',
  RESET_STATE_LOADING: 'RESET_STATE_LOADING',
  RESET_STATE_SUCCESS: 'RESET_STATE_SUCCESS',
  RESET_STATE_ERROR: 'RESET_STATE_ERROR',
};

export const authLogin = (data) => {
  return (dispatch, getState, { API }) => {
    dispatch({
      type: types.AUTH_SESSION_TOKEN_LOADING,
    });
    return dispatch({
      type: types.AUTH_LOGIN,
      call: API.auth.Login,
      params: data,
      success: types.AUTH_SESSION_TOKEN_SUCCESS,
      error: types.AUTH_SESSION_TOKEN_ERROR,
      public: true,
    });
  };
};

export const authLogout = (data) => {
  return (dispatch, getState, { API }) => {
    dispatch({
      type: types.RESET_STATE_LOADING,
    });
    return dispatch({
      type: types.RESET_STATE,
      call: API.auth.Logout,
      params: data,
      success: types.RESET_STATE_SUCCESS,
      error: types.RESET_STATE_SUCCESS, // also go with success
      public: true,
    });
  };
};

export const authPristine = () => {
  return { type: types.AUTH_PRISTINE };
};
