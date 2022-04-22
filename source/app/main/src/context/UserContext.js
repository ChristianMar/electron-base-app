import React, { useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authPristine, authLogout } from '../actions/auth';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(authPristine());
    dispatch(authLogout());
  };

  const onNavigate = () => {
    if (!auth.me.payload.token) {
      navigate('login');
    } else {
      navigate('app/index');
    }
  };

  useEffect(() => {
    onNavigate();
  }, []);

  useEffect(() => {
    onNavigate();
  }, [auth.me.payload.token]);

  useEffect(() => {
    onNavigate();
  }, [window.location.hash]);

  return (
    <React.Fragment>
      <UserContext.Provider
        value={{
          onLogout: onLogout,
        }}
      >
        {children}
      </UserContext.Provider>
    </React.Fragment>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node,
};

export default UserContext;
