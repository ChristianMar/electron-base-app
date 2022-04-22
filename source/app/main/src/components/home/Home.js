import React, { useEffect, useContext } from 'react';
import { useTranslate } from 'react-polyglot';
import { useDispatch, useSelector } from 'react-redux';

import { authPristine } from '../../actions/auth';
import UserContext from '../../context/UserContext';
import { HomeWidget } from '@ui';

let Home = ({}) => {
  const userContext = useContext(UserContext);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const t = useTranslate();

  useEffect(() => {
    dispatch(authPristine());
  }, []);

  return (
    <HomeWidget
      labels={{
        welcome: t('home.welcome'),
        logout: t('home.logout'),
      }}
      onLogout={userContext.onLogout}
      loading={auth.logout.loading}
      error={auth.logout.error}
    />
  );
};

Home.propTypes = {};

export default Home;
