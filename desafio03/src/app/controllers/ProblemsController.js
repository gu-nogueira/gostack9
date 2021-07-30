import DeliveryProblems from '../models/DeliveryProblems';
import Deliveries from '../models/Deliveries';
import Recipients from '../models/Recipients';
import Deliverymen from '../models/Deliverymen';

class ProblemsController {

  async index(req, res) {

    const { page = 1 } = req.query;

    const deliveries = await DeliveryProblems.findAll({
      attributes: ['id', 'description'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [{
        model: Deliveries,
        as: 'delivery',
        attributes: [
          'product',
          'start_date',
        ],
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
      }],
    });

    return res.json(deliveries);
  }
}

export default new ProblemsController ();
