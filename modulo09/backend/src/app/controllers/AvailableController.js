import { startOfDay, endOfDay, setHours, setMinutes, setSeconds, format, isAfter } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';

class AvailableController {

  async index(req, res) {

    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'Invalid date'});
    }

    const searchDate = parseInt(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(setMinutes(setHours(searchDate, hour), minute), 0);

      return {
        time,
        // Vamos utilizar o format do date-fns para formatar a data no formato padrão como utilizamos até então e como salvamos no banco
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        // Agora vamos fazer a verificação se o horário está ou não disponível
        available:
          // Vamos checar com o método isAfter do date-fns se 'value', que é a nossa data, está depois (se ainda não passou) do 'new Date()', que é o agora
          isAfter(value, new Date()) &&
          // Agora vamos checar se esses horários não estão reservados (se não há appointments para eles)
          // Vamos utilizar o método '.find()' no array appointments, portanto se encontrar retornará false, pois há '!' (sinal de negação antes de appointments)
          !appointments.find(a =>
            // Vamos utilizar o format novamente pois este é o formato dos horários que temos no parâmetro 'time' do nosso objeto de 'available'
          format(a.date, 'HH:mm') == time),
      };

    });

    return res.json(available);
  }

}

 export default new AvailableController ();
