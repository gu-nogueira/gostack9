import React from 'react';
import { Link } from 'react-router-dom';

import Search from '../../components/Search';
import List from '../../components/List';

import { MdOutlineAdd } from 'react-icons/md';
import { Row } from './styles';

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
      <List category="deliveries" headers={headers} data={data} />
    </>
  );
}

export default Deliveries;
