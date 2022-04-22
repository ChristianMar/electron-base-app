import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

import { LabelButton, CenteredWidget } from '../../common';

export const ErrorWidget = ({ labels, onLogout, loading }) => {
  return (
    <CenteredWidget>
      {labels.error}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth={true}
        onClick={onLogout}
      >
        <LabelButton loading={loading} label={labels.goHome} />
      </Button>
    </CenteredWidget>
  );
};

ErrorWidget.propTypes = {
  labels: PropTypes.shape({
    error: PropTypes.string,
    goHome: PropTypes.string,
  }),
  onLogout: PropTypes.func,
  loading: PropTypes.bool,
};
