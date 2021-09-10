import Users from "../models/Users";
import Notification from "../schemas/Notification";

class NotificationController {

  async index(req, res) {

    // Este controller só poderá ser acessível por providers
    const checkIsProvider = await Users.findOne({
      where: { id: req.userId, provider: true },
    })

    if (!checkIsProvider) {
      return res.status(401).json({ error: 'Only providers can load appointments notifications' });
    }

    // No mongoose é .find e não .findAll como no sequelize
    const notifications = await Notification.find({
      user: req.userId,
      // Toda parte de ordenação, limite... Não vamos fazer aqui dentro. Vamos fazer com 'chainning', concatenando métodos, agora vamos concatenar com o método .sort, e com .limit para limitar para 20 notificações
    }).sort({ createdAt: 'desc' }).limit(20);

    return res.json(notifications);

  }

  async update (req, res) {

    // Temos um método dentro do mongoose que já busca por id e já atualiza, portanto .findByIdAndUpdate
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      // Como segundo parâmetro desse método, vamos passar um objeto informando o que queremos atualizar desse registro
      { read: true },
      // Como terceiro parâmetro, passaremos { new: true } para que após atualizar, o mongoose retorne o a nova notificação para poder retornar ao usuário
      { new: true },
    )

    return res.json(notification);
  }

}

export default new NotificationController();
