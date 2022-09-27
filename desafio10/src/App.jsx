import React from 'react';
import { useSelector } from 'react-redux';
import { StatusBar } from 'react-native';

import Routes from './routes';

import colors from './styles/colors';

const MainApp = () => {
  const signed = useSelector((state) => state.auth.signed);
  const backgroundColor = signed ? colors.background : colors.purple;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      <Routes signed={signed} />
    </>
  );
};

export default MainApp;
