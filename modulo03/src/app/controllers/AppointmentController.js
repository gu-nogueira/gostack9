import Users from '../models/Users';
import Appointment from '../models/Appointment';

import { startOfHour, parseISO, isBefore } from 'date-fns';
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
    const checkIsProvider = await Users.findOne({
      where: { id: provider_id, provider: true },
    })

    if (!checkIsProvider) {
      return res.status(401).json({ error: 'Please create appointments only with providers' });
    }

    // parseISO transforma a string UTC num objeto 'date' do javascript, e aí então ele poderá ser usado no startOfHour
    // O startOfHour só considera o que for passado no campo horas, ignorando minutos e segundos, então por exemplo se for passado 19:30, só pegará 19:00
    const hourStart = startOfHour(parseISO(date));

    // Verifica se hourStart está ANTES da data atual, ou seja, se não passou a hora ainda
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    // Verifica se o provider não tem horário agendado
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        // canceled_at tem que ser null pois caso seja cancelado o provider estará disponível neste horário
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res.status(400).json({ error: 'Appointment date is not available' });
    }

    // Feitas as verificações, vamos criar o agendamento

    const appointment = await Appointment.create({
      // Lembrando que o middleware de autenticação (auth.js) pega automaticamente o id do usuário quando ele autentica, por isso temos o id do usuário em 'req.userId'
      user_id: req.userId,
      provider_id,
      // Vamos passar o hourStart para criar o campo date no appointment, assim asseguraremos que os campos minutos e segundos ficarão zerados
      date: hourStart,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();