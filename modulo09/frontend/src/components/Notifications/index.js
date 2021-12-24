import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    // '!!' força o retorno de um booleano, assim como o 'Boolean()' por volta da expressão no commonJS
    () => !!notifications.find((notification) => notification.read === false),
    // Memoiza a função ouvindo notifications -> Relembrando... useMemo é parecido com o useEffect, com a diferença de que não recarrega a função por completo caso não haja alterações na variável ouvida
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');

      const data = response.data.map((notification) => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          // addSuffix example: 3 days 'ago'
          { addSuffix: true, locale: ptBR }
        ),
      }));

      setNotifications(data);
    }

    loadNotifications();
  }, []);

  function handleToggleVisible() {
    // Transforma o valor ao contrário do seu valor atual
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map((notification) =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map((notification) => (
            // O id no mongodb possui '_' antes
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {/* Verifica se notification.read é false com '!'. Usa-se o '&&' para condições ternárias sem o 'else', ou ':' */}
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => {
                    handleMarkAsRead(notification._id);
                  }}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}

export default Notifications;
