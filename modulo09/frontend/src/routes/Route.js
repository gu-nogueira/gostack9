// Ao invés de importar 'Route' do 'react-router-dom', vamos importar nosso próprio componente Route
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/layouts/auth';
import DefaultLayout from '../layouts/default';

import { store } from '~/store';

// Vamos pegar das props deste componente
export default function RouteWrapper({
  // Colocamos com 'C' maiúsuclo para utilizar a sintaxe do jsx
  component: Component,
  // Esta prop será arbitrada para as rotas, padrão será false
  isPrivate,
  // Todo o restante das propriedades será armazenado na variável rest
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }


  // Checado se o usuário está ou não logado, e se está ou não acessando uma rota privada, podemos deixá-lo navegar pelas rotas privadas se autenticado

  const Layout = signed ? DefaultLayout : AuthLayout;



  return (
    <Route
      { ...rest }
      render={props => (
        // Assim, configuramos um 'layout padrão' para as rotas, tanto para autenticada quanto não
        <Layout>
          {/* Dentro de todas essas props serão passadas props de navegação, de rota, etc */}
          <Component {...props} />
        </Layout>
      )}
    />
  )
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
