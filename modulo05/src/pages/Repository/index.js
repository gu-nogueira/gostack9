import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { Container } from './styles';

import api from '../../services/api';

class Repository extends Component {

  // Podemos definir no formato de classe as propTypes como propriedade estática
  static propTypes = {
    // '.shape()' é uma propriedade do tipo objeto
    match: PropTypes.shape({
      // Dentro dessa propriedade há outras propriedades. 'params' também é um objeto, portanto ela também irá receber '.shape()'
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
      // Is required só é necessário no primeiro parâmetro do objeto
    }).isRequired ,
  }

  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  // Vamos definir o 'componentDidMount' como assíncrono, pois vamos utilizá-lo para buscar os dados da api
  async componentDidMount() {
    // Dentro de 'match.params' das nossas props estão os parâmetros que passamos pela rota
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    // Precisaremos fazer duas chamadas a api

    // não precisamos usar 'await' duas vezes pois não tem necessidade de aguardar uma api ser chamada para outra executar, é ineficiente.
    // Para corrigir isso, vamos usar Promise.all, dentro disso um array '[]' com todas as promises que queremos chamar
    // Dessa forma, as duas requisições serão feitas instantâneamente e os próximos códigos só irão executar depois que ambas acabarem
    // Os resultados das Promises vêm em um array, então vamos fazer uma desestruturação para pegar os resultados
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        // Conseguimos abrir um objeto e passar alguns parâmetros de configuração dentro do método '.get()', estes são os 'query.params' da nossa aplicação
        params: {
          // Queremos que somente retorne as issues com estado de 'open'
          state: 'open',
          per_page: 5,
        },
      })
    ]);

    this.setState({
      // Feita a chamada na api, capturado todos os dados, vamos salvá-los no state
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });

  }

  render() {

    const { repository, issues, loading } = this.state;

    return (
      <h1>
        {/* Caso fosse o nome do repositório, precisaríamos usar 'decodeURIComponent(match.params.repository)' */}
        Repository
      </h1>
    )
  }
}

export default Repository;
