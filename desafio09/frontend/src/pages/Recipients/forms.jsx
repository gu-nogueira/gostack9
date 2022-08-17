import React, { useEffect } from 'react';

import Input from '../../components/Input';

import { Row, Wrapper } from './styles';

function RecipientsForms({ setInitialData }) {
  /*
   * Fills with initial data if it's an edit
   */

  useEffect(() => {
    if (setInitialData && typeof setInitialData === 'function') {
      setInitialData();
    }
  }, [setInitialData]);

  return (
    <>
      <Row>
        <Wrapper stretch>
          <label htmlFor="name">Nome</label>
          <Input name="name" id="name" placeholder="Nome e sobrenome" />
        </Wrapper>
      </Row>
      <Row>
        <Wrapper width={60}>
          <label htmlFor="address">Endereço</label>
          <Input name="address" id="address" placeholder="R. Fulano de Tal" />
        </Wrapper>
        <Wrapper width={20}>
          <label htmlFor="number">Número</label>
          <Input name="number" id="number" placeholder="123" />
        </Wrapper>
        <Wrapper width={20}>
          <label htmlFor="complement">Complemento</label>
          <Input
            name="complement"
            id="complement"
            type="complement"
            placeholder="Apto. 101"
          />
        </Wrapper>
      </Row>
      <Row>
        <Wrapper stretch>
          <label htmlFor="city">Cidade</label>
          <Input name="city" id="city" placeholder="São Paulo" />
        </Wrapper>
        <Wrapper stretch>
          <label htmlFor="state">Estado</label>
          <Input name="state" id="state" placeholder="123" />
        </Wrapper>
        <Wrapper stretch>
          <label htmlFor="zipcode">Cep</label>
          <Input
            name="zipcode"
            id="zipcode"
            type="zipcode"
            placeholder="Apto. 101"
          />
        </Wrapper>
      </Row>
    </>
  );
}

export default RecipientsForms;
