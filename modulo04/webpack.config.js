const path = require('path');

module.exports = {
  // Aqui vamos passar o diretório do arquivo. Como em alguns sistemas operacionais talvez não reconheça, vamos usar path do node pois o webpack é baseado no node;
  entry: path.resolve(__dirname, 'src', 'index.js'),
  // output é onde será criado o arquivo bundle, de código javascript transpilado. Ficará´dentro de public
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  module: {
    // Aqui criaremos algumas regras para o webpack, informando para ele para qual tipo de arquivo o que deve utilizar
    // Esses são chamados de LOADERS
    rules: [
      {
        // Criamos uma expressão regular para pegar todos os arquivos que começam com esta extensão .js e terminam com isso
        test: /\.js$/,
        // Exclui tudo que estiver dentro de node_modules
        exclude: /node_modules/,
        use: {  
          // Mais para frente teremos loader de css, loader de imagens, e por aí vai...
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        // use é um array pois vamos importar mais de um loader
        use: [
          // O style loader serve para importarmos arquivos css, onde ele será enviado para nosso index.html em uma tag style
          { loader: 'style-loader'},
          // Utilizamos o css loader também pois podemos ter outros imports de dentro dos arquivos css, é possível até mesmo importar um outro arquivo css de dentro de um arquivo css com a sintaxe de import . from
          { loader: 'css-loader'},
        ],
      },
      {
        // o pipe simboliza OU gif OU png OU jpeg, com '?' depois do e para sinalizar que o 'e' é opcional (pode haver .jpg também). Tudo isso com 'i' no final para simbolizar que é case INSENSITIVE
        test: /.*\.(gif|png|jpe?g)$/i,
        use: {
          loader: 'file-loader',
        },
      }
    ]
  }
};