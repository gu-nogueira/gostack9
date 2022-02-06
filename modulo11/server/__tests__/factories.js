import { faker } from '@faker-js/faker';
import { factory } from 'factory-girl';
import User from '../src/app/models/User';

// Para cada model é recomendado possuir seu próprio factory, podemos gerar a quantidade de registros de dados que quisermos (1, 10, 50...)

// O nome do define (primeiro parametro), geralmente é o mesmo do model
// O segundo parâmetro é o Model que será utilizado para gerar os dados
// O terceiro parâmetro são os dados em si, que são gerados automaticamente com o faker
factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
