import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import api from '../../services/api';

// import { Container } from './styles';

class User extends Component {
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
  }

  state = {
    stars: [],
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const { user } = this.props.route.params;

    navigation.setOptions({ title: user.name });

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data });
  }

  render() {
    const { stars } = this.state;
    return <View />;
  }
}

export default User;
