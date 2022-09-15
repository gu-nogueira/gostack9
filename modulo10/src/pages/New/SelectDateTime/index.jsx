import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import { Container, HourList, Hour, Title } from './styles';

const SelectDateTime = ({ navigation, route }) => {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const { provider } = route.params;

  // ** Fetchs available data from api for the selected provider

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`/providers/${provider.id}/available`, {
        params: { date: date.getTime() },
      });

      setHours(response.data);
    }

    loadAvailable();
  }, [date, provider.id]);

  // ** Handles the selected date

  function handleSelectHour(item) {
    if (item.available) {
      navigation.navigate('Confirm', {
        provider,
        time: item.value,
      });
    }
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
        <HourList
          data={hours}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => (
            <Hour
              enabled={item.available}
              onPress={() => {
                handleSelectHour(item);
              }}>
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
};

export default SelectDateTime;
