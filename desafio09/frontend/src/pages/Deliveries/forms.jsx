import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Input from '../../components/Input';
import Select from '../../components/Select';

import { Row, Wrapper } from './styles';

function DeliveriesForms() {
  const [recipients, setRecipients] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchFormData() {
    try {
      setLoading(true);
      const searches = [api.get('/recipients'), api.get('/deliverymen')];
      const [recipientsResponse, deliverymenResponse] = await Promise.all(
        searches
      );
      setRecipients(
        recipientsResponse.data.map((recipient) => ({
          value: recipient.id,
          label: recipient.destiny_name,
          ...recipient,
        }))
      );
      setDeliverymen(
        deliverymenResponse.data.map((deliverymen) => ({
          value: deliverymen.id,
          label: deliverymen.name,
          ...deliverymen,
        }))
      );
    } catch (err) {
      // Improve this error handling
      toast.error('Não foi possível carregar os dados');
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchFormData();
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
              !loading ? 'Selecione um destinatário' : 'Carregando...'
            }
          />
        </Wrapper>
        <Wrapper stretch>
          <label htmlFor="deliveryman">Entregador</label>
          <Select
            name="deliveryman"
            options={deliverymen}
            placeholder={!loading ? 'Selecione um entregador' : 'Carregando...'}
          />
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
