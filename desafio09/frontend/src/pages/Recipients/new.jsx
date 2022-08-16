import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';
import RecipientsForms from './forms';

import { Row, Wrapper } from './styles';
import { MdArrowBack, MdOutlineDone } from 'react-icons/md';
import { ReactComponent as Loader } from '../../assets/svgs/loader.svg';

/*
 *  Yup schema structure
 */

const schema = Yup.object().shape({
  name: Yup.string()
    .test('complete-name', 'Insira um nome e sobrenome', (name) => {
      const [firstName, lastName] = name.split(' ');
      return !!(firstName && lastName);
    })
    .required('Nome obrigatório'),
  email: Yup.string().required('Email obrigatório'),
});

function RecipientsNew() {
  const [loading, setLoading] = useState(false);

  const formRef = useRef();

  async function handleSubmit({ name, email, avatar }) {
    try {
      /*
       *  Remove all previous errors
       */
      formRef.current.setErrors({});

      /*
       *  Yup validation
       */

      await schema.validate({ name, email }, { abortEarly: false });

      setLoading(true);

      if (avatar) {
        const upload = new FormData();
        upload.append('file', avatar);
        const response = await api.post('files', upload);
        const { id } = response.data;
        avatar = id;
      }

      await api.post('/deliverymen', {
        name,
        email,
        avatar_id: avatar,
      });

      setLoading(false);

      toast.success('Entregador cadastrado com sucesso!');
      history.push('/deliverymen');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};

        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        return formRef.current.setErrors(validationErrors);
      }

      setLoading(false);

      toast.error('Não foi possível cadastrar o entregador');
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Row mb={30}>
        <h2>Cadastro de encomendas</h2>
        <Wrapper flex>
          <Link to="/deliverymen" className="button grey">
            <MdArrowBack size={20} />
            <span>Voltar</span>
          </Link>
          <button type="submit" className="button">
            {loading ? (
              <>
                <Loader />
                <span>Carregando</span>
              </>
            ) : (
              <>
                <MdOutlineDone size={20} />
                <span>Salvar</span>
              </>
            )}
          </button>
        </Wrapper>
      </Row>
      <div className="card">
        <RecipientsForms />
      </div>
    </Form>
  );
}

export default RecipientsNew;
