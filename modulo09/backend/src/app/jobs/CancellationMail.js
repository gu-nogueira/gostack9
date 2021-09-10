
// Vvamos precisar importar o date-fns para tratar as datas e o pt para dar localidade de português para os mêses
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

// Vamos precisar importar Mail para realizar o envio de e-mail
import Mail from '../../lib/Mail';

class CancellationMail {
  // get key é como se estivessemos declarando uma variável dentro de CancellationMail
  // Será possível acessar a propriedade 'CancellationMail.key' de outros arquivos sem chamar o método com '()' na frente
  get key() {

    // Aqui vamos retornar uma chave única com o mesmo nome da classe. Para cada job precisamos de uma chave única
    return 'CancellationMail';
  }

  // Handle será a tarefa que será executada quando o processo for chamado
  // Handle receberá todas as informações necessárias como parâmetro do método (data) para enviar appointment. Passamos chaves para desestruturar pois vem mais coisas
  async handle({ data }) {

    // Vamos pegar todas as informações de appointment dentro de data
    const { appointment } = data;

    console.log('A fila executou!');

     // Após salvo o cancelamento, vamos enviar um email informando ao provider o cancelamento
     await Mail.sendMail({
      // Vamos definir aqui para quem vamos enviar o email, no formato to: `Nome <email@dominio.com>`
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      // Vamos enviar o subject do e-mail (cabeçalho)
      subject: 'Agendamento cancelado',
      // Corpo do email ((Pode ser html: ou text:)
      // Neste caso, usaremos template:, para enviar o cancellation.hbs
      template: 'cancellation',
      // Dentro de context iremos passar as variáveis que estamos utilizando dentro dos templates
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        // Vamos passar agora, no appointment.date
        // Precisamos passar o parseISO() do date-fns pois quando appointment foi passado como parâmetro para handle(), o mesmo foi recebido como string, portanto devemos retornar ao padrão do date-fns
        date: format(parseISO(appointment.date),"'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt
        }),
      },
    });

  }
}

export default new CancellationMail ();
