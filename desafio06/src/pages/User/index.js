import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import { Container, Header, Avatar, Name, Bio, Stars, Starred, OwnerAvatar, Info, Title, Author, Loading, LoadingSmall } from './styles';

class User extends Component {
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
  }

  state = {
    stars: [],
    page: 1,
    loading: false,
    loadingMore: false,
    refreshing: false,
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { navigation } = this.props;
    const { user } = this.props.route.params;
    navigation.setOptions({ title: user.name });
    const response = await api.get(`/users/${user.login}/starred`);
    this.setState({
      stars: response.data,
      loading: false,
    });
  }

  loadMore = async () => {
    this.setState({ loadingMore: true });
    const { user } = this.props.route.params;
    const { stars, page } = this.state;
    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page: page + 1, },
    });
    this.setState({
      stars: [...stars, ...response.data],
      page: page + 1,
      loadingMore: false,
    });
  }

  refreshList = () => {
    this.setState({
      stars: [],
      refreshing: true,
    });
    this.componentDidMount();
    this.setState({ refreshing: false });
  }

  handleNavigate = (repository) => {
    const { navigation } = this.props;
    navigation.navigate('Repository', { repository });
  };

  render() {
    const { user } = this.props.route.params;
    const { stars, loading, loadingMore, refreshing } = this.state;
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <Loading />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
        { loadingMore ? <LoadingSmall /> : null }
      </Container>
    );
  }
}

export default User;
