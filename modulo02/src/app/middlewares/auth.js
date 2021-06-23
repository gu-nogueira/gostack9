// Verifica se o usuário está logado

import jwt from 'jsonwebtoken';

// Vamos importar o 'promisify', uma biblioteca de 'util' que vem por padrão com o nodeJS. Vamos utilizá-la para transformar funções de callback em funções de async e await
import { promisify } from 'util';

// Precisamos importar o auth.js de config pois lá está o secret para autenticar o token
import authConfig from '../../config/auth';

// Vamos usar o next() para interceptar caso não satisfaça a condição
export default async (req, res, next) => {

  // authHeader recebe o token (caso haja) no header da requisição, com content-type de 'authorization' no formato 'bearer'
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token not provided.' });
  }

  // Aqui vamos tratar o token, vamos desestruturar em duas variáveis, sendo uma bearer e outra token. Porém como não iremos utilizar o bearer, podemos retirá-lo, ficando [,token]
  const [, token] = authHeader.split(' ');

  try {
    /** decoded é nossa constante que vai receber await, portanto irá aguardar ser executada, passando na função 'promisify' a função 'jwt.verify'
     *  Depois disso, sem precisar passar o callback, chamamos a função retornada pelo mromisify(), portanto vai ficar promisify()(), pois o segundo parênteses é a função retornada */
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // Se o toke estiver incorreto, vai cair no catch, pois estamos utilizando await no promisify

    /** Vamos incluir o id do usuário dentro do 'req', pois assim, poderemos capturá-lo nas rotas seguintes dentro do req */
    req.userId = decoded.id;

    // Posso dar um return next(); pois se o usuário chegou até aqui, significa que ele está autenticado
    return next();

  } catch (err) {
    return res.status(401).json({ error: 'Token invalid.' })
  }
};
