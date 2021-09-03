import React, { Component } from 'react';

import { Browser } from './styles';

class Repository extends Component {
  state = {
    repository: '',
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const { repository } = this.props.route.params;
    navigation.setOptions({ title: repository.name });
    this.setState({ repository });
  }

  render() {
    const { repository } = this.state;
    return (
      <Browser source={{ uri: repository.html_url }} />
    );
  }
}

export default Repository;
