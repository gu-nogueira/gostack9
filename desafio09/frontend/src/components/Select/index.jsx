import React, { useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';

import colors from '../../styles/colors';

// import { Container } from './styles';

function Select({ name, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  /*
   *  Unform registerField
   */

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        console.log(ref);
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const customStyles = {
    control: () => ({
      display: 'flex',
      border: `1px solid ${colors.grey2}`,
      borderRadius: 5,
      height: 38,
      width: '100%',
      padding: '0 7px',
      color: '#999',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#fff' : '#999',
    }),
    singleValue: (provided) => {
      const color = '#999';

      return { ...provided, color };
    },
  };

  return (
    // <Container>
    <ReactSelect
      name={name}
      ref={selectRef}
      defaultValue={defaultValue}
      classNamePrefix="react-select"
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: colors.purple,
          primary25: colors.purpleLight + '33',
        },
      })}
      {...rest}
    />
    // </Container>
  );
}

export default Select;
