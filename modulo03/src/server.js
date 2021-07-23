console.time("Load time");
console.log('Loading app...');
// Importanmos o server do app.js (onde exportamos com o module.exports)
import app from './app';

// Definimos a porta 2000 para receber as requests http
app.listen(process.env.PORT || 2000);

console.log(`Listening in: ${process.env.APP_URL}`);
// Fazemos essa separação, para quando formos fazer testes automatizados, não iremos inicializar o servidor numa porta mas sim fazer os testes diretamente na classe app no nosso arquivo app.js
