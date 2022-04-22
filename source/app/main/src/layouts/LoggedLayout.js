import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../components/home/Home';

const LoggedLayout = ({}) => {
  return (
    <Routes>
      <Route path="index" element={<Home />} />
    </Routes>
  );
};

LoggedLayout.propTypes = {};

export default LoggedLayout;
