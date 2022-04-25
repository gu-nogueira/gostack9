import React, { useState } from 'react';
import Select from 'react-select';

import colors from '../../styles/colors';

// import { Container } from './styles';

function Search({ placeholder, defaultValue }) {
  const [selected, setSelected] = useState();
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

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
    <Select
      onChange={setSelected}
      options={options}
      isSearchable
      defaultValue={defaultValue}
      placeholder={placeholder}
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: colors.purple,
          primary25: colors.purpleLight + '33',
        },
      })}
    />
  );
}

export default Search;
