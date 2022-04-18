import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '../../store/modules/auth/actions';

import IconInput from '../../components/IconInput';

import { Column } from './styles';
import Logo from '../../assets/svgs/logo-white.svg';
import { ReactComponent as Loader } from '../../assets/svgs/loader.svg';
import {
  MdOutlineSubdirectoryArrowLeft,
  MdPerson,
  MdEmail,
  MdLock,
} from 'react-icons/md';

/*
 *  Yup schema validation
 */

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Senha obrigatória'),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .oneOf([Yup.ref('password')], 'Senha não confere')
          .required('Confirme a senha')
      : field
  ),
});

function Register() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const profile = useSelector((state) => state.user.profile);

  async function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <Column>
        <Form schema={schema} onSubmit={handleSubmit}>
          <h2>Crie sua conta</h2>
          <IconInput
            icon={MdPerson}
            name="name"
            type="text"
            placeholder="Seu nome"
          />
          <IconInput
            icon={MdEmail}
            name="email"
            type="email"
            placeholder="Seu e-mail"
          />
          <IconInput
            icon={MdLock}
            name="password"
            type="password"
            placeholder="Sua senha"
          />
          <IconInput
            icon={MdLock}
            name="confirmPassword"
            type="password"
            placeholder="Confirmar senha"
          />
          <button type="submit">
            {loading ? (
              <>
                <Loader />
                {'Carregando'}
              </>
            ) : (
              'Cadastrar'
            )}
          </button>
          <div className="back">
            <Link to="/login">
              <MdOutlineSubdirectoryArrowLeft />
              Voltar para tela de login
            </Link>
          </div>
        </Form>
      </Column>
      <Column>
        <img src={Logo} alt="Ebovinos" />
      </Column>
    </>
  );
}

export default Register;
