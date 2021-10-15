// Ao invés de importar 'Route' do 'react-router-dom', vamos importar nosso próprio componente Route
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// Vamos pegar das props deste componente
export default function RouteWrapper({
  // Colocamos com 'C' maiúsuclo para utilizar a sintaxe do jsx
  component: Component,
  // Esta prop será arbitrada para as rotas, padrão será false
  isPrivate = false,
  // Todo o restante das propriedades será armazenado na variável rest
  ... rest
}) {
  const signed = false;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }


  // Checado se o usuário está ou não logado, e se está ou não acessando uma rota privada, podemos deixá-lo navegar pelas rotas privadas se autenticado

  return (
    <Route
      { ... rest }
      component={Component}
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
