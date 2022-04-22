import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

import { LabelButton, CenteredWidget, ErrorList } from '../../common';

export const HomeWidget = ({ labels, onLogout, loading, error }) => {
  return (
    <CenteredWidget>
      <ErrorList errors={error} />
      {labels.welcome}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth={true}
        onClick={onLogout}
        disabled={loading}
      >
        <LabelButton loading={loading} label={labels.logout} />
      </Button>
    </CenteredWidget>
  );
};

HomeWidget.propTypes = {
  labels: PropTypes.shape({
    welcome: PropTypes.string,
    logout: PropTypes.string,
  }),
  onLogout: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.shape(),
};
