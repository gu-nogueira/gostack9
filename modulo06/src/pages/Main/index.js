import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
// Importando async storage
import AsyncStorage from '@react-native-community/async-storage';
// Importando ícones
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import { Container, Form, Input, SubmitButton, List, User, Avatar, Name, Bio, ProfileButton, ProfileButtonText } from './styles';

// Criando componente usando snippet => 'rnfc'

class Main extends Component {
  // Só validamos proptypes de funções e estruturas que utilizamos
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  // Busca os dados
  async componentDidMount() {
    // O await será necessário aqui pois preciso do retorno para saber se há dados para exibir ou não
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  // Salva os dados no async storage
  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    this.setState({ loading: true });
    const { users, newUser } = this.state;
    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss();
  };

  handleNavigate = (user) => {
    const { navigation } = this.props;
    // Podemos passar como segundo parâmetro de '.navigate()' um objeto
    navigation.navigate('User', { user });
  };

  render() {
    const { users, newUser, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
          // Temos que setar alguns atributos do text input do React Native que podem atrapalhar, como por exemplo o autoCapitalize, que insere a primeira letra maíuscula, em caso de dúvidas cosnultar a documentação do React Native
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            { loading ? <ActivityIndicator color="#fff" /> : <Icon pointerEvents="none" name="add" size={20} color="#FFF" /> }
          </SubmitButton>
        </Form>
        {/* Utilizamos um componente próprio do react native para fazer listagem */}
        <List
          // Data é onde estarão os dados e deve ser um array
          data={users}
          // KeyExtractor é o key do React (item único)
          keyExtractor={user => user.login}
          // renderItem receberá uma função '() => {}', mas é finalizada com '()' pois retornará um conteúdo JSX, e podemos desestruturar o parâmetro recebido para pegar 'item', dentro de item estão todas as informações de cada usuário
          renderItem={({ item }) => (
            <User>
              {/* source é o mesmo que 'src' na web. Passamos uma primeira chave para indicar código javascript dentro, e outra segunda chave para indicar a passagem de um objeto */}
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              {/* Sempre quando é necessário passar um parâmetro deve ser passada uma arrow function */}
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}

export default Main;
