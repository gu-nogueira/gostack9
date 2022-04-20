import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

import Header from '../../components/Header';
// import Footer from '../../components/Footer';

function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header
        signed={children.props.signed}
        location={children.props.location}
      />
      <Content>{children}</Content>
      {/* <Footer signed={children.props.signed} /> */}
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
