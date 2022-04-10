import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliverymen from '../models/Deliverymen';
import Files from '../models/Files';

class DeliverymenController {
  async show(req, res) {
    const deliveryman = await Deliverymen.findByPk(req.params.id, {
      attributes: ['name', 'email'],
      include: [
        {
          model: Files,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    return res.json(deliveryman);
  }

  async index(req, res) {
    const { page = 1, q: search } = req.query;
    const filter = { [Op.iLike]: `%${search}%` };

    const deliverymen = await Deliverymen.findAll({
      order: ['name'],
      attributes: ['id', 'name', 'email'],
      where: search
        ? {
            [Op.or]: [{ name: filter }, { email: filter }],
          }
        : undefined,
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Files,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymen);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      avatar_id: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails, verify request body' });
    }

    const deliverymanExists = await Deliverymen.findOne({
      where: { email: req.body.email },
    });
    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const checkFileExists = await Files.findByPk(req.body.avatar_id);
    if (!checkFileExists) {
      return res.status(400).json({ error: 'File not found' });
    }

    const { name, email, avatar_id } = await Deliverymen.create(req.body);

    return res.json({
      name,
      email,
      avatar_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails, verify request body' });
    }

    const { email, avatar_id } = req.body;
    const deliveryman = await Deliverymen.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    // Checa se o e-mail foi alterado
    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliverymen.findOne({
        where: { email: req.body.email },
      });
      if (deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman already exists' });
      }
    }

    // Checa se há avatar
    if (avatar_id && avatar_id != deliveryman.avatar_id) {
      const checkFileExists = await Files.findByPk(req.body.avatar_id);
      if (!checkFileExists) {
        return res.status(400).json({ error: 'File does not exists' });
      }
    }

    const { name } = await deliveryman.update(req.body);

    return res.json({
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliverymen.findByPk(req.params.id, {
      include: [
        {
          model: Files,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    deliveryman.destroy();

    return res
      .status(204)
      .json({ message: `${deliveryman.name} has been deleted` });
  }
}

export default new DeliverymenController();
