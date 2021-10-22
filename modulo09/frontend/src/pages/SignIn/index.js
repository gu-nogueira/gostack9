import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

// O Yup serve tanto para validação backend / frontend, usamos .shape() pois vamos receber um objeto da API
const schema = Yup.object().shape({
  email: Yup.string()
  // Podemos colocar a mensagem desejada caso não satisfaça a condição, como no exemplo do e-mail
    .email('Insira um e-mail válido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .required('A senha é obrigatória'),
});

function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  // Vamos pasasar o parâmetro data desestruturado para melhor entendimento do código
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Go Barber" />

      {/* Agora passamos o schema do yup como propriedade no Form */}
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha secreta" />

        <button type="submit">{ loading ? 'Carregando...' : 'Acessar' }</button>
        <Link to ="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}

export default SignIn;
