import DeliveryProblems from '../models/DeliveryProblems';
import Deliveries from '../models/Deliveries';
import Recipients from '../models/Recipients';
import Deliverymen from '../models/Deliverymen';
import Files from '../models/Files';

import { Op } from 'sequelize';

class ProblemsController {

  async index(req, res) {
    const { page = 1 } = req.query;
    const problems = await DeliveryProblems.findAll({ attributes: ['delivery_id'] });
    const problemsId = problems.map(problems => problems.delivery_id);
    const deliveries = await Deliveries.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      attributes: [
        'id',
        'product',
        'start_date',
      ],
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
          include: [{
            model: Files,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          }],
        },
      ],
    });

    return res.json(deliveries);
  }

  async show (req, res) {

    const { id } = req.params;

    /**
     * Check if delivery exists
     */

    const delivery = await Deliveries.findByPk(id);
    if(!delivery) {
      res.status(404).json({ error: 'Delivery not found' });
    }

    /**
     * Check if problems exists
     */

    const problems = await DeliveryProblems.findAll({
      attributes: ['id', 'description'],
      where: { delivery_id: id },
    });
    if (!problems[0]) {
      return res.status(404).json({ error: 'There is no problems for this delivery' });
    }

    return res.json(problems);
  }

  async update (req, res) {
    return res.json("Problema cadastrado!");
  }

  async delete (req, res) {
    return res.json("Entrega cancelada!");
  }
}

export default new ProblemsController ();
