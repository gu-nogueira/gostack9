import Users from '../models/Users';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
// Para transformar data em português brasil
import pt from 'date-fns/locale/pt';

import * as Yup from 'yup';

// Importando filas
import Queue from '../../lib/Queue';
// Importando jobs de fila
import CancellationMail from '../jobs/CancellationMail';

class AppointmentController {

  // Index é o método de listagem
  async index (req, res) {

    // IMPORTANTE: pegamos os parâmetros do query, exemplo: 'http://localhost:2000/appointments?page=1' dentro de req.query
    // E se page não for informado o usuário estará na página 1 por padrão
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      // Vamos buscar todos os agendamentos feitos pelo usuário de id req.userId, e que não foram cancelados, portanto canceled_at: null
      where: { user_id: req.userId, canceled_at: null },
      // Vamos ordenar esses agendamentos pela data
      order: ['date'],
      // Vamos escolher os campos que queremos dos appointments
      attributes: ['id', 'date'],
      // Vamos listar no máximo 20 registros
      limit: 20,
      // Vamos definir quantos registros vamos pular
      offset: (page - 1) * 20,
      // Vamos incluir os dados dos prestadores de serviços
      include: [{
        model: Users,
        // Precisamos usar 'as' pois temos mais de um relacionamento que utiliza users
        as: 'provider',
        // Agora, vamos escolher os atributos para trabalhar dessa tabela linkada
        attributes: ['id', 'name',],
        // Vamos atribuir outro include para incluir o AVATAR do usuário
        include: [{
          model: File,
          as: 'avatar',
          // Precisamos incluir os campos id e path além da url se não a inclusão não funciona sem o id e não funciona pois path é necessário dentro do model de files
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

    /**
     * Notify appointment provider
     */

    // Vamos buscar todos os dados do usuário que realizou o agendamento para criar a notificação para o prestador de serviços
    const user = await Users.findByPk(req.userId);
    // Vamos usar o date-fns para formatar hourStart
    const formattedDate = format(
      hourStart,
      // O date fns não formata o que estiver dentro de ''
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      // Vamos formatar a data para pt-BR
      { locale: pt }
      );

    // Utilizando schema do mongoDB
    await Notification.create({
      // Uma coisa que precisamos ter claro quando utilizamos bancos não relacionais é a vantagem de NÃO utilizar relacionamentos e tornar a aplicação performática
      content: `Novo agendamento de ${user.name} para o ${formattedDate}`,
      // O único relacionamento que vamos armazenar aqui é o id do usuário que precisa receber a notificação
      user: provider_id,
    })

    return res.json(appointment);
  }

  async delete(req, res) {

    const appointment = await Appointment.findByPk(req.params.id, {
      // Ao usar o findByPk, depois do primeiro parâmetro vamos passar uma vírgula e passar um objeto para utilizar o INNER JOIN do Sequelize
      // O INNER JOIN do Sequelize é o include:[] (é sempre array)
      include: [{
        model: Users,
        // Passamos 'as:' pois temos dois relacionamentos como User dentro do model de Appointment
        as: 'provider',
        // Corrigido attributes é com dois 't'
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

    // Vamos usar o subHours do date-fns para reduzir a quantidade de horas de um campo date para menos duas horas
    const dateWithSub = subHours(appointment.date, 2);

    // Agora, vamos checar se o usuário pode cancelar o agendamento, com prazo máximo de até duas horas restantes
    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({ error: 'You can only cancel appointments 2 hours in advance'});
    }

    // Feitas todas as verificações, vamos setar a data de cancelamento para a data atual do sistema
    appointment.canceled_at = new Date();

    // Agora vamos salvar o appointment novamente no banco com sequelize
    await appointment.save();
    // Aqui, onde antes estávamos enviando um e-mail com 'Mail.sendMail', vamos enviar para fila 'Queue.add'
    // Poderiamos referenciar aqui diretamente a chave de CancellationMail, mas se algum dia essa chave mudar não será necessário mudar nada aqui
    await Queue.add(CancellationMail.key, {
      // Aqui passamos os dados do appointment dentro de um objeto
      appointment,
    });

    return res.json(appointment);

  }
}

export default new AppointmentController();
