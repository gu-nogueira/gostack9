import Users from '../models/Users';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import * as Yup from 'yup';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class AppointmentController {

  async index (req, res) {

    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [{
        model: Users,
        as: 'provider',
        attributes: ['id', 'name',],
        include: [{
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        }]
      }],
    });

    return res.json(appointments);
  }

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

    /**
     * Check if user id and provider_id are different
     */

    const checkUsersId = (req.userId === provider_id);
    if (checkUsersId) {
      return res.status(401).json({error: 'Cannot create appointments for yourself'});
    }

    /**
     * Check if date are not from past
     */

    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    /**
     * Check provider availability
     */

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });
    if (checkAvailability) {
      return res.status(400).json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    /**
     * Notify appointment provider
     */

    const user = await Users.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt },
      );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o ${formattedDate}`,
      user: provider_id,
    })

    return res.json(appointment);

  }

  async delete(req, res) {

    const appointment = await Appointment.findByPk(req.params.id, {
      include: [{
        model: Users,
        as: 'provider',
        attributes: ['name', 'email'],
      },
      {
        model: Users,
        as: 'user',
        attributes: ['name'],
      }]
    });

    /**
     * Check if appointment user_id is the same of logged in user id
     */

    if (appointment.user_id != req.userId) {
      return res.status(401).json({ error: 'You do not have permission to cancel this appointment'});
    }

    /**
     * Check if cancelation is inside 2 hours period
     */

    const dateWithSub = subHours(appointment.date, 2);
    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({ error: 'You can only cancel appointments 2 hours in advance'});
    }

    appointment.canceled_at = new Date();

    await appointment.save();
    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.json(appointment);

  }
}

export default new AppointmentController();
