import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO, format } from 'date-fns';

import Background from '~/components/Background';

// ** Redux actions
import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Avatar,
  Initial,
  Image,
  Content,
  Label,
  Text,
  Logout,
  TextButton,
} from './styles';
import colors from '~/styles/colors';

export default function Profile() {
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  const initial = useMemo(
    () =>
      user.name
        .split(' ')
        .map((n) => n[0])
        .join(''),
    [user.name],
  );

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background background={colors.background}>
      <Container>
        <Avatar>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} />
          ) : (
            <Initial>{initial}</Initial>
          )}
        </Avatar>
        <Content>
          <Label>Nome completo</Label>
          <Text>{user.name}</Text>

          <Label>E-mail</Label>
          <Text>{user.email}</Text>

          <Label>Data de cadastro</Label>
          {/* <Text>{format(parseISO(user.createdAt), 'dd/MM/yyyy')}</Text> */}

          <Logout onPress={handleLogout}>
            <TextButton>Logout</TextButton>
          </Logout>
        </Content>
      </Container>
    </Background>
  );
}
