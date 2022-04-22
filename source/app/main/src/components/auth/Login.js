import React, { useEffect, Fragment } from 'react';
import { Form } from 'react-final-form';
import { useTranslate } from 'react-polyglot';
import { useDispatch, useSelector } from 'react-redux';

import { authPristine, authLogin } from '../../actions/auth';
import { isRequired } from '../../utils/validationRules';
import { LoginWidget } from '@ui';

let Login = ({}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const t = useTranslate();

  useEffect(() => {
    dispatch(authPristine());
  }, []);

  const onLogin = (data) => {
    dispatch(authPristine());
    dispatch(authLogin(data));
  };

  return (
    <Fragment>
      <Form
        onSubmit={onLogin}
        initialValues={{
          username: '',
          password: '',
        }}
        validate={(values) => {
          const errors = {};
          errors['username'] = isRequired(
            t('validation.errors.required', { field: t('login.username') }),
            values['username']
          );
          errors['password'] = isRequired(
            t('validation.errors.required', { field: t('login.password') }),
            values['password']
          );
          return errors;
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <LoginWidget
              labels={{
                username: t('login.username'),
                password: t('login.password'),
                login: t('login.login'),
              }}
              onLogin={handleSubmit}
              loading={auth.me.loading}
              error={auth.me.error}
            />
          </form>
        )}
      />
    </Fragment>
  );
};

Login.propTypes = {};

export default Login;
