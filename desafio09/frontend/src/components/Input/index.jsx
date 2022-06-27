import React, { useState } from 'react';

import { Input as UnformInput } from '@rocketseat/unform';

import { Container } from './styles';
import { HiEye, HiEyeOff } from 'react-icons/hi';

function Input({
  icon: Icon,
  name,
  type,
  placeholder,
  defaultValue,
  onChange,
}) {
  const [focused, setFocused] = useState();
  const [visible, setVisible] = useState(false);

  function handleFocus(i) {
    setFocused(!focused);
  }

  function handleBlur(i) {
    setFocused(false);
  }

  return (
    <Container focused={focused}>
      {Icon && <Icon size={18} />}
      <UnformInput
        name={name}
        type={type === 'password' ? (visible ? 'text' : 'password') : type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {type === 'password' && (
        <button type="button" onClick={() => setVisible(!visible)}>
          {visible ? <HiEyeOff size={18} /> : <HiEye size={18} />}
        </button>
      )}
    </Container>
  );
}

export default Input;
