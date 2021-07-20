console.log('Loading queues...');
// Importamos o arquivo de biblioteca Queue.js
import Queue from './lib/Queue';
// Fazemos isso pois não iremos executar as filas no mesmo node (no mesmo processo) que a aplicação principal. Pois dessa forma podemos rodar nossas filas em outro servidor, num outro core do processador, totalmente a parta da aplicação principal.
Queue.processQueue();
