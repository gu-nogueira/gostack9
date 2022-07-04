import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Input from '../../components/Input';
import Select from '../../components/Select';

import { Row, Wrapper } from './styles';

function DeliveriesForms() {
  const [recipients, setRecipients] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);

  async function fetchRecipients() {
    try {
      const response = await api.get('/recipients');
      const rows = response.data;
      setRecipients(
        rows.map(({ id, destiny_name, ...rest }) => ({
          value: id,
          label: destiny_name,
          rest,
        }))
      );
    } catch (err) {
      // Improve this error handling
      toast.error('Não foi possível carregar os destinatários');
    }
  }
  useEffect(() => {
    fetchRecipients();
  }, []);

  return (
    <>
      <Row>
        <Wrapper stretch>
          <label htmlFor="recipient">Destinatário</label>
          <Select
            name="recipient"
            options={recipients}
            placeholder={
              recipients.length > 0
                ? 'Selecione um destinatário'
                : 'Carregando...'
            }
          />
        </Wrapper>
        <Wrapper stretch>
          <label htmlFor="deliveryman">Entregador</label>
          <Select name="deliveryman" />
        </Wrapper>
      </Row>
      <Row>
        <Wrapper stretch>
          <label htmlFor="product">Nome do produto</label>
          <Input name="product" />
        </Wrapper>
      </Row>
    </>
  );
}

export default DeliveriesForms;
