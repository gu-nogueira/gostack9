import React from 'react';

import { Form } from '@rocketseat/unform';

import history from '../../services/history';
import DeliveriesForms from './forms';

import { MdArrowBack, MdOutlineDone } from 'react-icons/md';
import { Row, Wrapper } from './styles';

function DeliveriesNew() {
  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row mb={30}>
        <h2>Cadastro de encomendas</h2>
        <Wrapper flex>
          <button
            className="button grey"
            onClick={() => history.push('/deliveries/history')}
          >
            <MdArrowBack size={20} />
            Voltar
          </button>
          <button type="submit" className="button">
            <MdOutlineDone size={20} />
            Salvar
          </button>
        </Wrapper>
      </Row>
      <div className="card">
        <DeliveriesForms />
      </div>
    </Form>
  );
}

export default DeliveriesNew;
