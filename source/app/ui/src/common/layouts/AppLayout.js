import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';

import customTheme from '../../styles/UITheme';

export const AppLayout = ({ children }) => (
  <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
);

AppLayout.propTypes = {
  children: PropTypes.node,
};
