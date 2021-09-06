import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import history from '../../../services/history';
import { toast } from 'react-toastify';
import { formatPrice } from '../../../utils/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';

// o function terá este asterisco, que é uma funcionalidade do javacript chamada generator, que faz a mesma coisa que o async antes da function
// Não iremos utilizar async await pois o generator consegue fazer mais coisas que o async await não tem suporte

// Esta função terá a responsabilidade por acessar a api, buscar as informações detalhadas do produto e cadastrá-las no carrinho

// Ela será como um passo a mais entre a action e o reducer que possuimos atualmente
function* addToCart({ id }) {
  // sempre que usarmos o effect do saga sempre precisamos do yield antes
  // para acessarmos informações do state, precisamos usar o 'select' do redux-saga
  const productExists = yield select(
    // aqui recebemos na função o state completo, neste state entramos no reducer de cart e daremos um '.find()' para encontrar o produto igual ao id recebido pela função 'addToCart'
    state => state.cart.find(p => p.id == id),
  );
  const stock = yield call(api.get, `/stock/${id}`);

  // Quantidade em estoque na api
  const stockAmount = stock.data.amount;
  // Esta constante verifica se o produto já existe e pega sua quantidade em carrinho, se não é 0
  const currentAmount = productExists ? productExists.amount : 0;

  // Atualiza a quantidade atual após clique do botão
  const amount = currentAmount + 1;

  // Aqui se a quantia requisitada pelo usuário for maior que a em estoque na api, retorna alguma coisa
  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    // Utilizamos o return para parar a função
    return;
  }

  // AQUI É UMA REGRA DE NEGÓCIO PARA VERIFICAR SE O PRODUTO JÁ EXISTE, CASO JÁ EXISTA APENAS ADICIONARÁ +1 EM AMOUNT
  if (productExists) {
    // Podemos disparar o success aqui diretamente pois já fizemos a verificação de estoque lá em cima
    yield put(updateAmountSuccess(id, amount));
  } else {
  // 'yield' é o await do generator. tudo que colocamos depois do yield, irá aguardar a execução, para depois percorrer o restante do código
  // Precisaremos de métodos auxiliares do redux saga para utilizar o yield
  // 'call()' e outros métodos do redux-saga são assíncronos e retornam promises do javascript
  // não chamaremos do axios com '.get(...)', passaremos como segundo parâmetro da função 'call' o que seria chamado pelo '.get'. Qualquer outro parâmetro pode ser passado nos próximos parâmetros de 'call()'
  const response = yield call(api.get, `/products/${id}`);

  const data = {
    ...response.data,
    amount: 1,
    formatPrice: formatPrice(response.data.price),
  }

  // put dispara uma action dentro do redux-saga
  yield put(addToCartSuccess(data));

  history.push('/cart');
  }

}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

// o método '.all()' do redux-saga para cadastrarmos vários 'listeners', para ficar ouvindo se uma action for disparada. Existem vários métodos do redux-saga para ouvir uma action como o 'takeEvery' ou o 'takeLatest' (isso não tem mais fim...)
export default all([
  // Este método garante que se forem feitas várias requisições em um período de tempo, irá aguardar uma resposta da api para colocar a próxima em fila. até lá, as requisições que forem feitas serão descartadas.
  // um exemplo dessa funcionalidade são vários clicks no botão pelo usuário
  // o primeiro parâmetro do método 'takeLatest()' é o type da action vamos ouvir, o segundo é qual função será disparada
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
