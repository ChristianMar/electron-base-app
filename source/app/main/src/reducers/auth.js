import { types } from '../actions/auth';

const initialState = {
  me: {
    loading: false,
    error: null,
    payload: {},
  },
  logout: {
    loading: false,
    success: false,
    error: null,
    forceLogout: false,
  },
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_SESSION_TOKEN_LOADING:
      return {
        ...state,
        me: {
          ...state.me,
          loading: true,
          error: null,
        },
      };

    case types.AUTH_SESSION_TOKEN_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          loading: false,
          error: null,
          payload: action.payload,
        },
      };

    case types.AUTH_SESSION_TOKEN_ERROR:
      return {
        ...state,
        me: {
          ...state.me,
          loading: false,
          error: action.error,
        },
      };

    case types.RESET_STATE_LOADING:
      return {
        ...state,
        logout: {
          ...state.logout,
          loading: true,
          success: false,
        },
      };

    case types.RESET_STATE_SUCCESS:
      return {
        ...initialState,
        logout: {
          ...state.logout,
          loading: false,
          forceLogout: false,
          success: true,
          error: null,
        },
      };

    case types.RESET_STATE_ERROR:
      return {
        ...state,
        logout: {
          ...state.logout,
          loading: false,
          success: false,
          error: action.error,
        },
      };

    case types.AUTH_PRISTINE:
      return {
        ...state,
        me: {
          ...state.me,
          loading: false,
          error: null,
        },
        logout: {
          ...state.logout,
          loading: false,
          success: false,
          error: null,
        },
      };

    default:
      return state;
  }
}
