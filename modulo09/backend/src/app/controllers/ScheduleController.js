import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Users from '../models/Users';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index (req, res) {
    const checkUserProvider = await Users.findOne({ where: {
      id: req.userId,
      provider: true,
    } });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({ where: {
      provider_id: req.userId,
      canceled_at: null,
      date: {
        // Vamos fazer uma comparação between no postgresql, mas usando os operators do sequelize
        // Para definir uma variável dentro de um objeto, sem setar exatamente como um nome dentro do objeto vamos usar '[]' para definir como uma chave do objeto
        // O operador Op.between do sequelize retorna um array, entre x e y
        // startOfDay e endOfDay são definidos já pelo date-fns
        [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
      },
    },
    // Vamos ordenar esses agendamentos por data
    order: ['date'],
  });

    return res.json(appointments);
  }
}

export default new ScheduleController();
