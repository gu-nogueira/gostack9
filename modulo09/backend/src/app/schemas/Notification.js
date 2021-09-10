// Representação de um schema de notificações para o MongoDB

import Mongoose from 'mongoose';

// Aqui definimos nosso schema instanciado de mongoose.schema, vamos definir os campos
const NotificationSchema = new Mongoose.Schema({
  // Precisamos definir pelo menos os campos principais que vamos utilizar, para quando o javascript quando estiver salvando os dados dentro do schema, saiba quais campos pode salvar
  content: {
    // Aqui aceita os tipos primitivos do javascript (String, Number, Boolean, Array, Object)
    type: String,
    required: true,
  },
  user: {
    // Como armazenamos no req.userId um integer, vamos usar tipo number
    type: Number,
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
    // Define o valor padrão do campo
    default: false,
  }
}, {
  // Aqui definimos que também queremos os campos created_at e updated_at em todos os registros
  timestamps: true,
});

// Diferente do PostgreSQL com o Sequelize, não precisamos realizar um loader de model em index.js de database
// Podemos importá-lo diretamente de algum controller ou middleware
export default Mongoose.model('Notification', NotificationSchema);
