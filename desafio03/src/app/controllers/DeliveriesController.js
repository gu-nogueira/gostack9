import * as Yup from 'yup';
import { parseISO, isBefore, getHours } from 'date-fns';

import Deliveries from '../models/Deliveries';
import Recipients from '../models/Recipients';
import Deliverymen from '../models/Deliverymen';
import Files from '../models/Files';

import Queue from '../../lib/Queue';
import OrderMail from '../jobs/OrderMail';

class DeliveriesController {

  async index(req, res) {
    const { page = 1 } = req.query;

    // const deliveries = await Deliveries.findAll({ include: { all: true }});
    const deliveries = await Deliveries.findAll({
      order: ['id'],
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
      ],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Recipients,
          as: 'recipient',
          attributes: [
            'destiny_name',
            'address',
            'number',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
        {
          model: Deliverymen,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [{
            model: Files,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          }],
        },
        {
          model: Files,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails, verify request body'});
    }

    const { product, recipient_id, deliveryman_id } = req.body;

    const recipient = await Recipients.findByPk(recipient_id);
    const deliveryman = await Deliverymen.findByPk(deliveryman_id);

    if(!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    if(!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const { id } = await Deliveries.create({
      product,
      recipient_id,
      deliveryman_id,
    });

    // E-mail queue
    await Queue.add(OrderMail.key, {
      product,
      recipient,
      deliveryman,
    });

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails, verify request body' });
    }


    const { recipient_id, deliveryman_id, signature_id, start_date, end_date } = req.body;
    const delivery = await Deliveries.findByPk(req.params.id);

    if(!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (recipient_id && recipient_id != delivery.recipient_id) {
      const recipientExists = await Recipients.findByPk(recipient_id);
      if (!recipientExists) {
        return res.status(400).json({ error: 'Recipient does not exists' });
      }
    }

    if (deliveryman_id && deliveryman_id != delivery.deliveryman_id) {
      const deliverymanExists = await Deliverymen.findByPk(deliveryman_id);
      if (!deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman does not exists' });
      }
    }

    if (signature_id) {
      const signatureExists = await Files.findByPk(signature_id);
      if (!signatureExists) {
        return res.status(400).json({ error: 'Signature does not exists' });
      }
    }

    if (start_date && start_date != delivery.start_date) {
      if (parseISO(start_date) < 8 || parseISO(start_date) >= 18) {
        return res.status(400).json({ error: 'The start date must be between 08:00 and 18:00' });
      }
      if (isBefore(parseISO(start_date), new Date())) {
        return res.status(400).json({ error: 'Cannot create new orders with past date' });
      }
    }

    if (end_date && !start_date) {
      if (!delivery.start_date) {
        return res.status(400).json({ error: 'The delivery has not been picked yet' });
      }
    }

    if (start_date && end_date) {
      if (isBefore(parseISO(end_date),parseISO(start_date))) {
        return res.status(400).json({ error: 'The end date cannot be before start date' });
      }
    }

    if (end_date) {
      if (isBefore(parseISO(end_date),delivery.start_date)) {
        return res.status(400).json({ error: 'The end date cannot be before start date' });
      }
      if (isBefore(parseISO(end_date), new Date())) {
        return res.status(400).json({ error: 'Cannot end orders with past date' });
      }
    }

    const { product } = await delivery.update(req.body);

    return res.json({
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
      start_date,
      end_date,
    });
  }

  async delete(req, res) {
    const delivery = await Deliveries.findByPk(req.params.id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    delivery.canceled_at = new Date();
    await delivery.save();
    return res.status(200).json({ message:` Delivery nº:${delivery.id} has been canceled` });
  }

}

export default new DeliveriesController ();
