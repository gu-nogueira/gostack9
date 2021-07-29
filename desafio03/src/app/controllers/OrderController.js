import Deliverymen from '../models/Deliverymen';
import Deliveries from '../models/Deliveries';
import Recipients from '../models/Recipients';
import Files from '../models/Files';

import { Op } from 'sequelize';
import * as Yup from 'yup';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

class OrderController {

  async index(req, res) {
    const deliveryman = await Deliverymen.findByPk(req.params.id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found'});
    }

    const { page = 1 } = req.query;
    const { delivered } = req.query || null;
    const deliveries = await Deliveries.findAll({
      where: {
        deliveryman_id: deliveryman.id,
        canceled_at: null,
        end_date: delivered ? { [Op.ne]:null } : null,
      },
      attributes: ['id', 'product', 'start_date', 'end_date', 'created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [{
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
        model: Files,
        as: 'signature',
        attributes: ['name', 'path', 'url'],
      }],
    });

    return res.json(deliveries);
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails, verify request body' });
    }

    const { id, deliveryId } = req.params;
    const { start_date } = req.body;

    const deliveryman = await Deliverymen.findByPk(id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found'});
    }

    const delivery = await Deliveries.findByPk(deliveryId, {
      where: {
        deliveryman_id: deliveryman.id,
        canceled_at: null,
        end_date: null,
      },
    });
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    const checkOrderLimit = await Deliveries.count({
      where: {
        deliveryman_id: deliveryman.id,
        start_date: { [Op.between]: [startOfDay(parseISO(start_date)), endOfDay(parseISO(start_date))] },
        // canceled_at: null,
      }
    });
    if (checkOrderLimit >= 5) {
      return res.status(400).json({ error: 'Exceeded limit of 5 orders per day' });
    }



    return res.json(checkOrderLimit);
  }
}

export default new OrderController ();
