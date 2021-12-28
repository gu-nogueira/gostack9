// Interessante: criar componentes dentro das pastas de pages, componentes que serão específicos naquela página
import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';

import { Container } from './styles';

function AvatarInput() {
  // COm o useField do unform conseguimos pegar os valores passados no 'initialData' do 'Form' a partir do 'defaultValue'
  const { defaultValue, registerField } = useField('avatar');

  // Verifica se há algo dentro de defaultValue para mostrar um preview
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  // Verifica, novamente, se já existe um id para avatar, para substituí-lo com o novo avatar id
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  // Ref pode iniciar sem nenhum valor
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        // ref.current é a referência do input tipo file
        ref: ref.current,
        // path é onde será buscada o valor do input, como foi passado o atributo 'data-file', o valor se encontrará dentro de uma propriedade chamada 'dataset', como é '-file', então, '.file'
        path: 'dataset.file',
      });
    }
    // Todas as variáveis externas que forem utilizadas no useEffect DEVEM vir no array listener do mesmo
  }, [ref, registerField]);

  async function handleChange(e) {
    // Criamos assim para enviar no formato multipart/form-data para o multer na api
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);
    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={preview || 'https://images.apilist.fun/adorable_avatars_api.png'}
          alt=""
        />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          // Passamos como a propriedade data-file no input para o unform recuperar esse dado
          data-file={file}
          onChange={handleChange}
          // O unform precisa de uma referência no input, por isso, passamos ref
          ref={ref}
        />
      </label>
    </Container>
  );
}

export default AvatarInput;
