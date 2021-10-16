import React from 'react';
import PropTypes from 'prop-types';

// Nos layouts podemos utilizar 'Wrapper' para auxiliar na diferenciação dos elementos na hora de inspecionar
import { Wrapper, Content } from './styles';

// '{ children }' são todos os componentes 'filhos' de AuthLayout
function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content> { children } </Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  // 'element' é quando o children vem como '<Exemplo />', quando vem somente 'Exemplo', é do tipo 'func'
  children: PropTypes.element.isRequired,
};

export default AuthLayout;
