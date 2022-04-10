import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class OrderMail {
  /*
   *  OrderMail.key
   */

  get key() {
    return 'OrderMail';
  }

  // Job 'constructor'
  async handle({ data }) {
    const { product, recipient, deliveryman } = data;

    console.log('Queue execution: OrderMail');

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
        date: format(new Date(), "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });

    console.log(`Sending mail from new delivery to: ${deliveryman.email}`);
  }
}
export default new OrderMail();
