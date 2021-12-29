import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setMilliseconds,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
// Não é possível cara... mais uma lib
import { utcToZonedTime } from 'date-fns-tz';
import ptBR from 'date-fns/locale/pt-BR';
import api from '~/services/api';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Container, Time } from './styles';

// Que porquisse em mano...
const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function Dashboard() {
  // O valor padrão do state é a data atual do usuário
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);

  // Memoiza a função ouvindo date
  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: ptBR }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map((hour) => {
        const checkDate = setMilliseconds(
          setSeconds(setMinutes(setHours(date, hour), 0), 0),
          0
        );
        const compareDate = utcToZonedTime(checkDate, timezone);
        return {
          time: `${hour}h00`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find((a) => {
            return isEqual(parseISO(a.date), compareDate);
          }),
        };
      });

      setSchedule(data);
    }

    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#FFF" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#FFF" />
        </button>
      </header>

      <ul>
        {schedule.map((time) => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}

export default Dashboard;
