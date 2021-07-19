// Vamos importar e criar o bee queue aqui, pois ele será também uma 'lib' extra da aplicação
import Bee from 'bee-queue';
// Vamos importar o CancellationMail que acabamos de criar, assim como importamos os models dentro de database > index.js, é o Queue.js que irá gerenciar e tratar todas as queues da nossa aplicação
import CancellationMail from '../app/jobs/CancellationMail';

// Vamos importar a configuração do redis
import redisConfig from '../config/redis';

// Vamos criar um array de jobs, assim como em nosso loader de models em database > index.js
const jobs = [CancellationMail];

class Queue {
  constructor() {
    // Aqui poderemos ter várias filas, cada background job terá sua própria queue
    this.queues = {};

    // Vamos criar um método init em 'this' para separarmos a inicialização das filas em outro método
    this.init();
  }

  init() {
    // Assim como em database > index.js da nossa aplicação, vamos importar várias 'queues' como são importados os 'models'
    // Todos os trabalhos criados dentro de filas são chamados de jobs

    // Podemos percorrer o array jobs tanto com .map quanto com .forEach, vamos usar o .forEach pois não precisamos retornar nada de dentro
    // Para cada job vamos receber o nosso job em si, então 'job => {}'
    // Mas para ficar ainda mais fácil, conseguimos pegar o key e o handle() dentro de cada job fazendo uma desestruturação, então vamos passar '({ key, handle })'. Podemos também acessar propriedades e métodos da classe dessa forma.
    jobs.forEach(({ key, handle }) => {
      // 'this.queues' pois é o objeto que criamos ali em cima dentro de this. Passamos a chave '[key]' primeiro, depois instanciamos 'Bee' dentro de um objeto no parâmetro bee, passando como primeiro parâmetro a chave novamente para Bee
      this.queues[key] = {
        bee: new Bee(key, {
          // Como segundo parâmetro de bee vamos passar algumas configurações: 1. Conexão com o Redis (redis Config)
          redis: redisConfig,
        }),
        // Como segundo parâmetro do objeto passaremos o método handle que vem de lá de dentro do nosso job, responsável por processar (realizar) a tarefa configurada em jobs
        handle,
      };
    });
  }

  // Agora vamos precisar criar um método para adicionar novos trabalhos dentro da fila
  // 'add()' vai receber como primeiro parâmetro queue, que será qual fila ele irá adicionar um novo trabalho, e vou receber como segundo parâmetro os dados de job em si, que são as informações do trabalho dentro do método 'handle()' como vimos
  add(queue, job) {
    // Vamos passar como parâmetro '[queue]', que é a qual fila ele deverá adicionar
    // Depois vamos pegar '.bee', que é a propriedade bee: new Bee...
    // E por fim vamos passar o método '.createJob', que é do próprio bee-queue
    // Vamos passar dentro de .createJob()' os dados de 'job' e por fim, '.save()'
    return this.queues[queue].bee.createJob(job).save();
  }

  // Feito tudo isso, estamos inicializando as nossas filas, adicionando novos itens dentro da fila, agora vamos realizar o processamento da fila
  // Ou seja, toda vez que tivermos uma nova adição de job no redis agora, ele será processado automaticamente em tempo real
  processQueue() {
    // Vamos percorrer cada um de nossos jobs dentro do array 'jobs'
    // Para cada job, vamos receber o job em si, então 'job => {}'
    jobs.forEach(job => {
      // Vamos buscar 'bee' e 'handle' dentro de cada job
      // Isso tudo, da fila relacionada àquele job, então '= this.queues' pegando o [job.key]
      const { bee, handle } = this.queues[job.key];

      // Feito isso, temos a fila e o handle (trabalho), vamos processar 'bee' com '.process' que é um método de bee-queue, passando como parâmetro o trabalho, então '(handle)'
      bee.process(handle);


    });
  }
}

export default new Queue();
