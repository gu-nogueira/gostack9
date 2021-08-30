import React, { Component } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, Menu, IssueList } from './styles';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired ,
  };

  state = {
    repository: {},
    issues: [],
    filters: [
      { state: 'all', name: 'Todos' },
      { state: 'open', name: 'Abertos' },
      { state: 'closed', name: 'Fechados' },
    ],
    loading: true,
    filterSelected: 'all',
    page: 1,
  };
  // Chamada a API
  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'all',
          per_page: 5,
        },
      })
    ]);
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  async componentDidUpdate(_, prevState) {
    const { filterSelected, page } = this.state;
    if (prevState.filterSelected !== filterSelected || prevState.page !== page) {
      const { match } = this.props;
      const repoName = decodeURIComponent(match.params.repository);
      const updatedIssues = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filterSelected,
          per_page: 5,
          page: page,
        },
      });
      this.setState({ issues: updatedIssues.data });
    }
  }

  handleFilter = (e) => {
    this.setState({ filterSelected: e.target.value });
  }

  handleNavigation = (e) => {
    this.setState({ page: e.currentTarget.value });
  }

  render() {
    const { repository, issues, filters, page, loading } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <Menu>
          <select onChange={this.handleFilter}>
            { filters.map(filter => { return <option value={filter.state}>{filter.name}</option> }) }
          </select>
        </Menu>
        <IssueList>
          { issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          )) }
        </IssueList>
        <Menu>
          <button type="button" value={Number(page) - 1} onClick={this.handleNavigation} disabled={page < 2}>
            <FaAngleLeft />
          </button>
          <small> Page { page } </small>
          <button type="button" value={Number(page) + 1} onClick={this.handleNavigation}  >
            <FaAngleRight />
          </button>
        </Menu>
      </Container>
    )
  }
}

export default Repository;
