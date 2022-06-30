import React from 'react';

import Input from '../../components/Input';
import Select from '../../components/Select';

import { Row, Wrapper } from './styles';

function DeliveriesForms() {
  return (
    <>
      <Row>
        <Wrapper stretch>
          <label htmlFor="recipient">Destinatário</label>
          <Select name="recipient" />
        </Wrapper>
        <Wrapper stretch>
          <label htmlFor="deliveryman">Entregador</label>
          <Select name="deliveryman" />
        </Wrapper>
      </Row>
      <Row>
        <Wrapper stretch>
          <label htmlFor="product">Nome do produto</label>
          <Input name="product" />
        </Wrapper>
      </Row>
    </>
  );
}

export default DeliveriesForms;
