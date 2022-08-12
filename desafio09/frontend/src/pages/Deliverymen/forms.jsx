import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Input from '../../components/Input';
import File from '../../components/File';

import { Row, Wrapper } from './styles';

function DeliverymenForms({ setInitialData }) {
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
        deliverymenResponse.data.rows.map((deliveryman) => ({
          value: deliveryman.id,
          label: deliveryman.name,
          ...deliveryman,
        }))
      );
    } catch (err) {
      // Improve this error handling
      toast.error('Não foi possível carregar os dados');
    }

    setLoading(false);
  }

  /*
   * Fills with initial data if it's an edit
   */

  useEffect(() => {
    (async () => {
      await fetchFormData();
      if (setInitialData && typeof setInitialData === 'function') {
        setInitialData();
      }
    })();
  }, [setInitialData]);

  return (
    <>
      <Row>
        <File name="avatar" />
      </Row>
      <Row>
        <Wrapper stretch>
          <label htmlFor="name">Nome</label>
          <Input name="name" id="name" placeholder="Nome e sobrenome" />
        </Wrapper>
        <Wrapper stretch>
          <label htmlFor="email">Email</label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="exemplo@efast.com.br"
          />
        </Wrapper>
      </Row>
    </>
  );
}

export default DeliverymenForms;
