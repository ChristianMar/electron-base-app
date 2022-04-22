import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Button } from '@mui/material';

import {
  RenderTextField,
  LabelButton,
  CenteredWidget,
  ErrorList,
} from '../../common';

export const LoginWidget = ({ labels, onLogin, loading, error }) => {
  return (
    <CenteredWidget>
      <ErrorList errors={error} />
      <Field
        name="username"
        component={RenderTextField}
        label={labels.username}
        fullWidth={true}
        disabled={loading}
        variant="standard"
        size="small"
      />
      <Field
        name="password"
        component={RenderTextField}
        label={labels.password}
        fullWidth={true}
        disabled={loading}
        type="password"
        variant="standard"
        size="small"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth={true}
        onClick={onLogin}
        disabled={loading}
      >
        <LabelButton loading={loading} label={labels.login} />
      </Button>
    </CenteredWidget>
  );
};

LoginWidget.propTypes = {
  labels: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    login: PropTypes.string,
  }),
  onLogin: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.shape(),
};
