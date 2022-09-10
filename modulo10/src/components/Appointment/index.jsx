import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

import colors from '~/styles/colors';

const Appointment = () => {
  return (
    <Container>
      <Left>
        <Avatar
          source={{
            uri: 'https://avatars.dicebear.com/api/initials/Gustavo%20Nogueira.png',
          }}
        />
        <Info>
          <Name>Gustavo Nogueira</Name>
          <Time>em 3 horas</Time>
        </Info>
      </Left>
      <TouchableOpacity onPress={() => {}}>
        <Icon name="event-busy" size={20} color={colors.warning} />
      </TouchableOpacity>
    </Container>
  );
};

export default Appointment;
