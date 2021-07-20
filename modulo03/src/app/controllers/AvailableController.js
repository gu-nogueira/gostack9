import { startOfDay, endOfDay, setHours, setMinutes, setSeconds, format, isAfter } from 'date-fns';
// Precisamos do Op do sequelize para buscar ranges de dados
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
class AvailableController {

  async index(req, res) {
    // Vamos pegar nessa rota o campo de data por query params no formato unix timestamp (podemos pegar rodando new 'Date().getTime()')
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date'});
    }

    const searchDate = parseInt(date);
    // const searchDate = Number(date); --> É a mesma coisa

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          // Vamos utilizar o mesmo operador do sequelize usado no ScheduleController
          // startOfDay & endOfDay ambos rececbem numérico então ok
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    // Teremos uma variável (array) com todos os possíveis horários de um provider, poderíamos fazer uma tabela para isso mas será feito de forma simples aqui
    const schedule = [
      '08:00',
      '09:00', // 2021-07-19 09:00:00 --> precisamos transormar essas informações neste formato
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

    // Vamos criar o objeto 'available' que irá retornar as datas disponíveis para o provider (usuário)
    // Vamos percorrer o array schedule e transformar cada posição no tipo time
    // o parâmetro time do método '.map()' irá receber cada um dos valores de schedule, exemplo: '08:00'
    const available = schedule.map(time => {
      // Vamos pegar hora e minuto utilizando o método '.split()', separando os valores pelo elemento ':'
      const [hour, minute] = time.split(':');
      // Esta será a variável da data no formato correto
      // Primeiro, 'setSeconds(...,0)' definirá os segundos como zero
      // Segundo, 'setMinutes(..., minute)' passará o valor de minutos pego pelo split acima
      // Terceiro, 'setHours(searchDate, hour)' pega searchDate (que é a nossa representação de data em formato unix timestamp do dia de HOJE e AGORA) e irá passar a hora pego também pelo split
      const value = setSeconds(setMinutes(setHours(searchDate, hour), minute), 0);

      // Agora iremos passar um objeto para retornar, 'available' será um vetor de vários objetos
      return {
        // time irá passar para o front-end no formato correto, exemplo '08:00'
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
