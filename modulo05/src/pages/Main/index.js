import React, { Component } from 'react';
// O '/fa' é uma abreviação do 'font awesome'
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';

// Importante: todas as importações que são relacionadas ao meu projeto devem ser feitas depois das importações de módulos
import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

class Main extends Component {

  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  // Como a chamada a API não é instantânea, usamos async
  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {

    const { newRepo, loading } = this.state;

    return (
      // Conseguimos manipular estilizações css passando nas props do componente
      // <Title error={false}>
      //   Main
      // </Title>

      // Vamos começar nosso projeto criando um componente estilizado Container

      <Container>
        <h1>
          <FaGithub />
          Repositórios
        </h1>
        {/* Decidimos quando criar novos componentes estilizados quando tivermos mais de dois encadeamentos dentro do componente, então por exemplo no caso do 'form', dentro fica o 'input', então vamos isolá-lo sua estilização em um novo componente */}
        <Form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Adicionar repositório" value={newRepo} onChange={this.handleInputChange} />
          {/* Toda vez que quisermos estilizar um elemento baseado em sua propriedade precisamos fazer um novo componente no styled-components */}
          <SubmitButton loading={loading}>
          {/* Precisamos verificar o estado do loading para alterar o ícone. Vamos usar o 'conditional handering' do React. Ele é feito dentro do Javascript */}
          { loading ? <FaSpinner color="#FFF" size={14} /> : <FaPlus color="#FFF" size={14} /> }
          </SubmitButton>
        </Form>
      </Container>
    );
  };
}

export default Main;
