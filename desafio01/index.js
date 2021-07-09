const express = require('express');
const server = express();

server.use(express.json());

const projects = [];
let requestCounter = 0;

// --- Middlewares ---

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(item => item.id == id);
  if (!project) {
    // Sintaxe correta: '.status' para enviar status code com .json
    return res.status(400).json({Error: 'Project not found'});
  }

  return next();
}

// Middleware global
server.use((req, res, next) => {
  
  requestCounter++;
  console.time(`Request ${requestCounter}`);

  next();

  //Importante: sintaxe final = timeEnd
  console.timeEnd(`Request ${requestCounter}`); 
});

// Outra forma de construir o middleware global que conta as requisições:
function logRequests(req, res, next) {

  // Usando console.count
  console.count("Número de requisições");

  return next();
}
// É possível usar .use em funções passadas como argumento, sem os '()'
server.use(logRequests);

// Criação de um project
server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project);
  return res.sendStatus(201);
});

// Consulta de projects
server.get('/projects', (req, res) => {
  return res.json(projects);
});

// Atualização de título de um project
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  //.find para achar a partir de algum parâmetro dentro do array, nesse caso, "item" que procura o id
  const project = projects.find(item => item.id == id);
  // Aqui, como project é uma const e está atrelado diretamente com projects, irá atualizar a informação em projects (única explicação que achei); 
  project.title = title;  
  
  return res.sendStatus(200);
});

// Remoção de um project
server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(item => item.id == id); // Pega o index do parâmetro que for passado, no caso, 'id'
  projects.splice(projectIndex, 1); // Pega projects e remove de projectindex

  return res.sendStatus(200);
});

// Criação de uma task
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  const project = projects.find(item => item.id == id);

  project.tasks.push(title);
  
  return res.sendStatus(201);

});

server.listen(2500);