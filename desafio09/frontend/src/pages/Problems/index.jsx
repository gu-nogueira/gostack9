import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Loader from '../../components/Loader';
import Search from '../../components/Search';
import List from '../../components/List';
import Pagination from '../../components/Pagination';

import { MdOutlineAdd } from 'react-icons/md';
import { Row, Wrapper } from './styles';

function Problems() {
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const [problemsTotal, setProblemsTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const headers = {
    delivery_id: 'Encomenda',
    description: 'Problema',
    updated_at: 'Atualizado em',
  };

  const options = ['view', 'delete'];
  const apiRoute = '/deliveries/problems';
  const params = {
    page: currentPage,
    perPage: 20,
    q: search,
  };

  async function fetchProblems() {
    setLoading(true);
    try {
      const response = await api.get(apiRoute, { params });
      const { rows, total } = response.data;
      setProblems(
        rows.map((problem) => {
          problem.raw = { ...problem };
          problem.delivery_id = `#${problem.delivery_id
            .toString()
            .padStart(2, 0)}`;
          return problem;
        })
      );
      setProblemsTotal(total);
    } catch (err) {
      console.error(err);
      toast.error('Não foi possível carregar os destinatários');
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search]);

  return (
    <>
      <h2>Gerenciando destinatários</h2>
      <Row mt={30}>
        <Wrapper flex gap={15}>
          <Search
            placeholder="Buscar por destinatários"
            onSearch={(value) => setSearch(value)}
          />
          <h4>{problemsTotal} registros encontrados</h4>
        </Wrapper>
        <Link className="button" to="/recipients/new">
          <MdOutlineAdd size={20} />
          <span>Cadastrar</span>
        </Link>
      </Row>
      {loading ? (
        <Loader />
      ) : (
        <Wrapper tableCell={'max-width: 30vw'}>
          <List
            category="recipients"
            headers={headers}
            data={problems}
            options={options}
            apiRoute={apiRoute}
            fetchData={fetchProblems}
          />
          <Pagination
            currentPage={currentPage}
            totalCount={problemsTotal}
            perPage={params.perPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Wrapper>
      )}
    </>
  );
}

export default Problems;
