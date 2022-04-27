import React from 'react';
import { Link } from 'react-router-dom';

import Search from '../../components/Search';
import List from '../../components/List';

import { MdOutlineAdd } from 'react-icons/md';
import { Row } from './styles';

function ViewContent({ delivery }) {
  return (
    <>
      <strong>Informações da encomenda</strong>
      <p>Rua Beethoven, 1729</p>
      <p>Diadema - SP</p>
      <p>09960-580</p>
      <hr />
      <strong>Datas</strong>
      <p>
        <b>Retirada:</b> 25/01/2022
      </p>
      <p>
        <b>Entrega:</b> 25/01/2022
      </p>
      <hr />
      <img src="" alt="" />
    </>
  );
}

function Deliveries() {
  const headers = {
    id: 'ID',
    name: 'Nome',
    address: 'Endereço',
  };

  const data = [
    { id: 1, name: 'Gustavo Nogueira', address: 'Rua do seu Zé' },
    { id: 2, name: 'Gustavo Nogueira', address: 'Rua do seu Zé' },
    { id: 3, name: 'Gustavo Nogueira', address: 'Rua do seu Zé' },
    { id: 4, name: 'Gustavo Nogueira', address: 'Rua do seu Zé' },
    { id: 5, name: 'Gustavo Nogueira', address: 'Rua do seu Zé' },
  ];

  const options = ['view', 'edit', 'delete'];

  return (
    <>
      <h2>Gerenciando encomendas</h2>
      <Row>
        <Search placeholder="Buscar por destinatários" />
        <Link className="button" to="/deliveries/new">
          <MdOutlineAdd size={20} />
          Cadastrar
        </Link>
      </Row>
      <List
        category="deliveries"
        headers={headers}
        data={data}
        options={options}
        viewContent={ViewContent}
      />
    </>
  );
}

export default Deliveries;
