import React, { Component } from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

class Main extends Component {

  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  // Alterações no input
  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  // Chamada a API
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { newRepo, repositories } = this.state;
    try {
      if (repositories.some(repo => repo.name === newRepo )) {
        throw new Error('Repositório duplicado');
      }
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        id: response.data.id,
        name: response.data.full_name,
      };
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;
    return (
      <Container>
        <h1>
          <FaGithub />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} error={error}>
          <input type="text" placeholder="Adicionar repositório" value={newRepo} onChange={this.handleInputChange} />
          <SubmitButton loading={loading}>
          { loading ? <FaSpinner color="#FFF" size={14} /> : <FaPlus color="#FFF" size={14} /> }
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repo => (
            <li key={repo.id}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>Detalhes</Link>
            </li>
          ))}
        </List>
      </Container>
    );
  };
}

export default Main;
