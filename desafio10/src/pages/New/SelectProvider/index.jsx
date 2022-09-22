import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

const SelectProvider = ({ navigation }) => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('/providers');
      setProviders(response.data);
    }

    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={(provider) => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() => {
                navigation.navigate('SelectDateTime', { provider });
              }}>
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
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
};

export default SelectProvider;
