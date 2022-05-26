import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Loader from '../../components/Loader';
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
  const [loading, setLoading] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const headers = {
    id: 'ID',
    recipient: 'Destinatário',
    deliveryman: 'Entregador',
    city: 'Cidade',
    state: 'Estado',
    status: 'Status',
  };

  const options = ['view', 'edit', 'delete'];

  async function getDataFromAPI() {
    setLoading(true);
    try {
      const response = await api.get('/deliveries', {
        params: { page: currentPage },
      });
      const rows = response.data;
      setDeliveries(
        rows.map((delivery) => {
          delivery.city = delivery.recipient.city;
          delivery.state = delivery.recipient.state;
          delivery.recipient = delivery.recipient.destiny_name;
          delivery.deliveryman = delivery.deliveryman.name; //provisório

          return delivery;
        })
      );
    } catch (err) {
      toast.error('Não foi possível carregar as encomendas');
    }
    setLoading(false);
  }

  function handlePagination(page) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  }

  useEffect(() => {
    getDataFromAPI();
  }, [currentPage]);

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
      {loading ? (
        <Loader />
      ) : (
        <List
          category="deliveries"
          headers={headers}
          data={deliveries}
          options={options}
          viewContent={ViewContent}
        />
      )}
    </>
  );
}

export default Deliveries;
