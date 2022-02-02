// Precisaremos mudar a importação do 'dotenv/config' para pegar o arquivo de teste quando rodarmos o comando 'yarn test'
// Como as outras importações dependem do 'dotenv/config', vamos criar este arquivo para lidar com as variáveis ambiente

// nomeamos 'dotenv' ao inves de importá-lo diretamente como 'dotenv/config'

const dotenv = require('dotenv');

// Dentro de path fazemos uma condição

// Precisaremos setar o NODE_ENV 'test' no package.json da aplicação
// OBS: no windows é diferente: set NODE_ENV=test
dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
