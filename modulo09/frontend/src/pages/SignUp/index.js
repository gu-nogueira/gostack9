import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

function SignUp() {
  function handleSubmit(data) {

  }
  return (
    <>
      <img src={logo} alt="Go Barber" />

      <Form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha secreta" />

        <button type="submit">Criar conta</button>
        <Link to ="/">Já tenho login</Link>
      </Form>
    </>
  );
}

export default SignUp;
