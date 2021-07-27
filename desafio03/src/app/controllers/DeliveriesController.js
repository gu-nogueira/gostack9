import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isBefore } from 'date-fns';

import Deliveries from '../models/Deliveries';
import Recipients from '../models/Recipients';
import Deliverymen from '../models/Deliverymen';
import Files from '../models/Deliverymen';

class DeliveriesController {

  async index(req, res) {

    const { page = 1 } = req.query;

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
      return res.status(400).json({ error: 'Recipient not found'});
    }

    if(!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found'});
    }

    await Deliveries.create({
      product,
      recipient_id,
      deliveryman_id,
    });

    return res.json({
      product,
      recipient_id,
      deliveryman_id,
    });

  }

  async update(req, res) {

    return res.json();
  }

  async delete(req, res) {

    return res.json();
  }

}

export default new DeliveriesController ();
