// O que ocorria é que os testes estavam conflitando entre si por a base de dados ja estar populada, este arquivo será responsável por limpar a base de dados;

import database from '../../src/database';

export default function truncate() {
  return Promise.all(
    Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: true,
        force: true,
      });
    })
  );
}
