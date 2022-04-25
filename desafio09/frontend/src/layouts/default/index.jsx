import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

import Header from '../../components/Header';

function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}

/*
 *  propTypes definition
 */

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DefaultLayout;
