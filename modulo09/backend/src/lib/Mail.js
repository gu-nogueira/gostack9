// nodemailer é a lib do node que vamos enviar para realizar o envio de emails
import nodemailer from 'nodemailer';
// Vamos importar resolve para setar um diretório onde estarão os templates
import { resolve } from 'path';
// Importando handlebars integrado com express
import exphbs from 'express-handlebars';
// Importando handlebars integrado com nodemailer
import nodemailerhbs from 'nodemailer-express-handlebars';
// Precisamos importar também o mail config que criamos em src > config > Mail.js
import mailConfig from '../config/mail';

// As libs seguem no padrão de classe, com método constructor
class Mail {
  constructor() {

    // Vamos desestruturar mailConfig
    const { name, host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      name,
      host,
      port,
      secure,
      // Verifica se dentro de auth.user há alguma coisa, se sim (?), guarda dentro de auth, se não (:), seta como nulo
      // Fazemos essa verificação pois algumas estratégias de envio de email não possui autenticação, nesses casos o nodemailer só utilizará host, port e secure
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    // Vamos passar para a nossa variável this.transporter que será retornada com o método sendMail o '.use', para adicionar uma configuração a mais em cima dele
    // o 'compile' do nodemailer é como ele irá compilar / formatar os templates de email. Como será interpretado pelo express-handlebars e pelo nodemailer-express-handlebars
    this.transporter.use('compile', nodemailerhbs({
      // Aqui passamos o express-handlebars com o método create
      viewEngine: exphbs.create({
        // Passamos aqui o diretório da pasta de layouts
        layoutsDir: resolve(viewPath, 'layouts'),
        // Passamos aqui o diretório da pasta de partials
        partialsDir: resolve(viewPath, 'partials'),
        // Definimos agora qual será o layout padrão a ser utilizado
        defaultLayout: 'default',
        // Definimos qual será a extensão desses arquivos
        extname: '.hbs',
      }),
      // Passamos viewPath agora para nodemailerhbs
      viewPath,
      // Por fim passamos extName para nodemailerhbs
      extName: '.hbs',
    }));
  }

  sendMail(message) {

    return this.transporter.sendMail({
      // Irá jogar tudo que estiver dentro de mailConfig.default e tudo que estiver dentro de message, fazemos isso com o (...) antes da variável
      ...mailConfig.default,
      ...message,
    });

  }
}

// Exportamos instanciando assim como nos controllers
export default new Mail();
