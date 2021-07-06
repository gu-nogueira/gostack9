import * as Yup from 'yup';

import Recipients from '../models/Recipients';

class RecipientsController {

  async store(req, res) {

    const schema = Yup.object().shape({
      destiny_name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required().uppercase().min(2).max(2),
      city: Yup.string().required(),
      cep: Yup.string().required().min(8).max(8),
    });
    if (!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Validation fails, verify request body' })
    }

    const destinyExists = await Recipients.findOne({ where: { destiny_name: req.body.destiny_name } });

    if (destinyExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const { id, destiny_name, address, number, complement, state, city, cep } = await Recipients.create(req.body);

    return res.json({
      id,
      destiny_name,
      address,
      number,
      complement,
      state,
      city,
      cep,
    });

  }

  async update(req, res) {

    const schema = Yup.object().shape({
      id: Yup.number().required(),
      destiny_name: Yup.string(),
      address: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string().uppercase().min(2).max(2),
      city: Yup.string(),
      cep: Yup.string().min(8).max(8),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails, please verify request body'});
    }

    // Verifica se alterou destiny_name
    const recipient = await Recipients.findByPk(req.body.id);
    if (req.body.destiny_name != recipient.destiny_name) {
      const destinyExists = await Recipients.findOne({ where: { destiny_name: req.body.destiny_name } });
      if (destinyExists) {
        return res.status(400).json({ error: 'Recipient already exists' });
      }
    }

    const { id, destiny_name, address, number, complement, state, city, cep } = await recipient.update(req.body);

    return res.json({
      id,
      destiny_name,
      address,
      number,
      complement,
      state,
      city,
      cep,
    });

  }

  async index(req, res) {

    const schema = Yup.object().shape({
      select: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails, please verify request body'});
    }

    if (req.body.select !== "*") {
      return res.status(400).json({ error: 'Syntax error' });
    }

    const recipients = await Recipients.findAll();

    return res.json({ recipients });

  }
}

export default new RecipientsController();
