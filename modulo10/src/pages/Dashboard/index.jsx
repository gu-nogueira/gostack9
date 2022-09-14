import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  // ** Fetch appointments from API on Mount

  useEffect(() => {
    loadAppointments();
  }, []);

  // ** Fetch appointments from API

  async function loadAppointments() {
    const response = await api.get('/appointments');

    setAppointments(response.data);
  }

  // ** Cancel an appointment action

  async function handleCancel(id) {
    const response = await api.delete(`/appointments/${id}`);

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment,
      ),
    );
    // loadAppointments();
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
};

export default Dashboard;
