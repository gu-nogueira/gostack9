import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class OrderMail {

  // Job 'id'
  get key() {
    return 'OrderMail';
  }

  // Job 'constructor'
  async handle({ data }) {
    const { product, recipient, deliveryman } = data;

    console.log("A fila executou!");

     await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega disponível',
      template: 'order',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.destiny_name,
        product: product,
        address: recipient.address,
        number: recipient.number,
        city: recipient.city,
        state: recipient.state,
        date: format(new Date (),"'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt
        }),
      },
    });

    console.log(`Enviando email de nova entrega para: ${deliveryman.email}`);

    console.log("E-mail enviado com sucesso!");
  }

}
export default new OrderMail ();
