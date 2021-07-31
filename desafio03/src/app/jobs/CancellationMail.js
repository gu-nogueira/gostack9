import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class CancellationMail {

  // Job 'id'
  get key() {
    return 'CancellationMail';
  }

  // Job 'constructor'
  async handle({ data }) {
    const { delivery, problemsDescription } = data;

    console.log("A fila executou!");

     await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Entrega cancelada',
      template: 'cancellation',
      context: {
        deliveryman: delivery.deliveryman.name,
        id: delivery.id,
        recipient: delivery.recipient.destiny_name,
        product: delivery.product,
        problems: problemsDescription,
        address: delivery.recipient.address,
        number: delivery.recipient.number,
        city: delivery.recipient.city,
        state: delivery.recipient.state,
        date: format(parseISO(delivery.canceled_at),"'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt
        }),
      },
    });

    console.log(`Enviando email de nova entrega para: ${ delivery.deliveryman.email }`);
    console.log("E-mail enviado com sucesso!");
  }

}
export default new CancellationMail ();
