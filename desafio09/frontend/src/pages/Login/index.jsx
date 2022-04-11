import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import CustomInput from '../../components/CustomInput';

import { Column } from './styles';
import Logo from '../../assets/svgs/logo-gradient.svg';
import { ReactComponent as Loader } from '../../assets/svgs/loader.svg';
import { MdEmail, MdLock } from 'react-icons/md';

/*
 *  Yup schema validation
 */

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
});

function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <Column>
        <img src={Logo} alt="Ebovinos" />
        <h1>
          Faça seu login <br />
          na plataforma
        </h1>
      </Column>
      <Column>
        <Form schema={schema} onSubmit={handleSubmit}>
          <CustomInput
            icon={MdEmail}
            name="email"
            type="email"
            placeholder="E-mail"
          />
          <CustomInput
            icon={MdLock}
            name="password"
            type="password"
            placeholder="Senha"
          />
          <Link to="/forgot">Esqueci minha senha</Link>
          <button type="submit">
            {loading ? (
              <>
                <Loader />
                {'Carregando'}
              </>
            ) : (
              'Entrar'
            )}
          </button>
          <small>
            Não possui uma conta? <Link to="/register">Registre-se</Link>
          </small>
        </Form>
      </Column>
    </>
  );
}

export default Login;
