import React from 'react';

import history from '../../services/history';
import DeliveriesForms from './forms';

import { MdArrowBack, MdOutlineDone } from 'react-icons/md';
import { Row, Wrapper } from './styles';

function DeliveriesNew() {
  return (
    <>
      <Row mb={30}>
        <h2>Cadastro de encomendas</h2>
        <Wrapper>
          <button
            className="button grey"
            onClick={() => history.push('/deliveries/history')}
          >
            <MdArrowBack size={20} />
            Voltar
          </button>
          <button className="button">
            <MdOutlineDone size={20} />
            Salvar
          </button>
        </Wrapper>
      </Row>
      <div className="card">
        <DeliveriesForms />
      </div>
    </>
  );
}

export default DeliveriesNew;
