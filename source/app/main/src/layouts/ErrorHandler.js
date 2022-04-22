import React, { useContext, useState, useEffect, useRef } from 'react';
import { useTranslate } from 'react-polyglot';
import { useSelector } from 'react-redux';

import { ErrorWidget } from '@ui';
import UserContext from '../context/UserContext';

const ErrorHandler = ({ error, resetErrorBoundary }) => {
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const userContext = useContext(UserContext);
  const t = useTranslate();

  const prevLoading = useRef();

  useEffect(() => {
    prevLoading.current = auth.logout.loading;
  }, []);

  useEffect(() => {
    if (
      auth.logout.loading === false &&
      prevLoading.current !== auth.logout.loading
    ) {
      resetErrorBoundary();
      setLoading(false);
    }

    prevLoading.current = auth.logout.loading;
  }, [auth.logout.loading]);

  return (
    <ErrorWidget
      labels={{
        error: t('errorBoundary.error'),
        goHome: t('errorBoundary.goHome'),
      }}
      onLogout={() => {
        setLoading(true);
        userContext.onLogout();
      }}
      loading={loading}
    />
  );
};

ErrorHandler.propTypes = {};

export default ErrorHandler;
