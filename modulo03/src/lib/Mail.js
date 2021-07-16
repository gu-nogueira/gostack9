// nodemailer é a lib do node que vamos enviar para realizar o envio de emails
import nodemailer from 'nodemailer';
// Precisamos importar também o mail config que criamos em src > config > Mail.js
import mailConfig from '../config/mail';

// As libs seguem no padrão de classe, com método constructor
class Mail {
  constructor() {

    // Vamos desestruturar mailConfig
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      // Verifica se dentro de auth.user há alguma coisa, se sim (?), guarda dentro de auth, se não (:), seta como nulo
      // Fazemos essa verificação pois algumas estratégias de envio de email não possui autenticação, nesses casos o nodemailer só utilizará host, port e secure
      auth: auth.user ? auth : null,
    });
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
