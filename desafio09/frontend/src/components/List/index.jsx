import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MdMoreHoriz } from 'react-icons/md';
import { Container, DropBox } from './styles';

function List({ category, headers, data }) {
  const [active, setActive] = useState();
  const dropDownRef = useRef(new Array(data.length));

  const handleClickOutside = useCallback(
    (e) => {
      if (
        dropDownRef.current[active] &&
        !dropDownRef.current[active].contains(e.target)
      ) {
        return setActive(null);
      }
    },
    [active]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Container>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.values(headers).map((header, index) => (
                <th key={index} scope="col">
                  {header}
                </th>
              ))}
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((registry, index) => (
              <tr key={registry + index}>
                {Object.keys(headers).map((column, index) => {
                  switch (column) {
                    case 'teste':
                      return (
                        <td key={column + index} data-label={headers[column]}>
                          <span className="teste">{registry[column]}</span>
                        </td>
                      );

                    default:
                      return (
                        <td key={column + index} data-label={headers[column]}>
                          {registry[column]}
                        </td>
                      );
                  }
                })}
                <td data-label="Ações">
                  <button
                    title="Ações"
                    onClick={() => {
                      setActive(index);
                    }}
                  >
                    <MdMoreHoriz size={22} />
                  </button>
                  <DropBox
                    ref={(el) => (dropDownRef.current[index] = el)}
                    active={active === index ? true : false}
                  >
                    <li>
                      <Link to={`/${category}/${registry.id}`}>Editar</Link>
                    </li>
                    <li>
                      <Link to={`/${category}/${registry.id}`}>Excluir</Link>
                    </li>
                  </DropBox>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span>Nenhum resultado encontrado :(</span>
      )}
    </Container>
  );
}

export default List;
