import Users from '../models/Users';
import Appointment from '../models/Appointment';

import * as Yup from 'yup';

class AppointmentController {
  async store(req, res) {

    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { provider_id, date } = req.body;

    /**
     * Check if provider_id is a provider
     */
    const isProvider = await Users.findOne({
      where: { id: provider_id, provider: true },
    })

    if (!isProvider) {
      return res.status(401).json({ error: 'Please create appointments only with providers' });
    }

    // Feita a verificação, vamos criar o agendamento

    const appointment = await Appointment.create({
      // Lembrando que o middleware de autenticação (auth.js) pega automaticamente o id do usuário quando ele autentica, por isso temos o id do usuário em 'req.userId'
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
