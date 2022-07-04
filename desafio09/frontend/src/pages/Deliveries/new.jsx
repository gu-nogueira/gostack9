import React, { useRef } from 'react';

import { Link } from 'react-router-dom';
import { Form } from '@unform/web';

import history from '../../services/history';
import DeliveriesForms from './forms';

import { MdArrowBack, MdOutlineDone } from 'react-icons/md';
import { Row, Wrapper } from './styles';

function DeliveriesNew() {
  const formRef = useRef();

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
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
