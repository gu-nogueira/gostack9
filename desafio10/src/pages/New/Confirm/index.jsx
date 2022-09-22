import React, { useMemo } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

const Confirm = ({ navigation, route }) => {
  const { provider, time } = route.params;

  const dateFormatted = useMemo(() => {
    const dateParsed = formatRelative(parseISO(time), new Date(), {
      locale: ptBR,
    });
    return dateParsed.charAt(0).toLocaleUpperCase() + dateParsed.slice(1);
  }, [time]);

  async function handleAddAppointment() {
    await api.post('/appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? // ** The default 'localhost' URL is not accessible from the Android emulator
                provider.avatar.url.replace('localhost', '10.0.2.2')
              : `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
                  provider.name,
                )}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>
        <SubmitButton onPress={handleAddAppointment}>
          Confirmar Agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
};

export default Confirm;
