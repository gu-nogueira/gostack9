import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Modal from '../Modal';

import api from '../../services/api';

import { MdMoreHoriz, MdEdit, MdDelete } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { Container, DropBox, DeleteWarning } from './styles';

function List({
  category,
  headers,
  data,
  options,
  apiRoute,
  fetchData,
  viewContent: ViewContent,
}) {
  const [active, setActive] = useState();
  const dropDownRef = useRef(new Array(data.length));

  /*
   *  Options behavior
   */

  async function handleDelete(id, name) {
    try {
      await api.delete(`${apiRoute}/${id}`);
      toast.success(`${name} excluído com sucesso`);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(
        `Não foi possível excluir ${name}, tente novamente mais tarde`
      );
    }
  }

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

  /*
   *  useEffect listener for dropDown
   */

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
                {Object.keys(headers).map((column, index) => (
                  <td key={column + index} data-label={headers[column]}>
                    {registry[column]}
                  </td>
                ))}
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
                    {options.map((option, index) => {
                      switch (option) {
                        case 'view':
                          return (
                            <li key={index}>
                              <button
                                onClick={async () =>
                                  Modal.show({
                                    title: `Informações sobre ${registry.name}`,
                                    content: (
                                      <ViewContent delivery={registry} />
                                    ),
                                    resolver: () => 0,
                                  })
                                }
                              >
                                <AiFillEye className={option} /> Visualizar
                              </button>
                            </li>
                          );

                        case 'delete': {
                          return (
                            <li key={index}>
                              <button
                                onClick={async () =>
                                  Modal.show({
                                    title: `Excluir ${registry.name}`,
                                    content: (
                                      <>
                                        <DeleteWarning />
                                        <span>
                                          <b>Atenção:</b> esta ação é
                                          irreverrsível! Deseja continuar?
                                        </span>
                                      </>
                                    ),
                                    cta: 'Excluir',
                                    resolver: () =>
                                      handleDelete(
                                        registry.raw.id,
                                        registry.name
                                      ),
                                  })
                                }
                              >
                                <MdDelete className={option} /> Deletar
                              </button>
                            </li>
                          );
                        }

                        default:
                          return (
                            <li key={index}>
                              <Link
                                to={{
                                  pathname: `/${category}/${registry.id}`,
                                  state: registry.raw,
                                }}
                              >
                                <MdEdit className={option} /> Editar
                              </Link>
                            </li>
                          );
                      }
                    })}
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
