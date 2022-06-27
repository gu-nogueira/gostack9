import DeliveryProblems from '../models/DeliveryProblems';
import Deliveries from '../models/Deliveries';
import Recipients from '../models/Recipients';
import Deliverymen from '../models/Deliverymen';
import Files from '../models/Files';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

import { Op } from 'sequelize';
import * as Yup from 'yup';

class ProblemsController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const problems = await DeliveryProblems.findAll({
      attributes: ['delivery_id'],
    });
    const problemsId = problems.map((problems) => problems.delivery_id);
    const deliveries = await Deliveries.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'product', 'start_date'],
      where: {
        id: { [Op.in]: problemsId },
        canceled_at: null,
      },
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
          include: [
            {
              model: Files,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const { id } = req.params;

    /*
     * Check if delivery exists
     */

    const delivery = await Deliveries.findByPk(id);
    if (!delivery) {
      res.status(404).json({ error: 'Delivery not found' });
    }

    /*
     * Check if problems exists
     */

    const problems = await DeliveryProblems.findAll({
      attributes: ['id', 'description'],
      where: { delivery_id: id },
    });
    if (!problems[0]) {
      return res
        .status(400)
        .json({ error: 'There is no problems for this delivery' });
    }

    return res.json(problems);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails, verify request body' });
    }

    const { id, deliveryId } = req.params;
    const { description } = req.body;
    /*
     * Check if deliveryman exists
     */

    const deliveryman = await Deliverymen.findByPk(id);
    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    /*
     * Check if delivery exists
     */

    const delivery = await Deliveries.findByPk(deliveryId);
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    /*
     * Check if delivery belongs to deliveryman
     */

    if (deliveryman.id != delivery.deliveryman_id) {
      return res
        .status(400)
        .json({ error: 'You do not have permission to deliver this delivery' });
    }

    /*
     * Check if delivery has not been delivered or canceled yet
     */

    if (delivery.canceled_at != null || delivery.end_date != null) {
      return res.status(400).json({ error: 'This delivery has already ended' });
    }

    const problem = await DeliveryProblems.create({
      description: description,
      delivery_id: delivery.id,
    });

    return res.json(problem);
  }

  async delete(req, res) {
    const { id } = req.params;

    /*
     * Check if delivery exists
     */

    const delivery = await Deliveries.findByPk(id, {
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
        },
      ],
    });
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    /*
     * Check if delivery has not been delivered or canceled yet
     */

    if (delivery.canceled_at !== null || delivery.end_date !== null) {
      return res.status(400).json({ error: 'This delivery has already ended' });
    }

    /*
     * Check if delivery really have problems
     */

    const problems = await DeliveryProblems.findAll({
      where: {
        delivery_id: delivery.id,
      },
      attributes: ['description'],
    });
    if (!problems[0]) {
      return res
        .status(400)
        .json({ error: 'There is no problems for this delivery' });
    }

    /*
     * Mapping problems description
     */

    const problemsDescription = problems.map(
      (problems) => problems.description
    );

    delivery.canceled_at = new Date();
    await delivery.save();

    await Queue.add(CancellationMail.key, { delivery, problemsDescription });
    return res.json({
      message: `Delivery nº ${delivery.id} has been canceled`,
    });
  }
}

export default new ProblemsController();
