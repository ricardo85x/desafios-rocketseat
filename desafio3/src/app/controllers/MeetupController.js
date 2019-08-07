import * as Yup from 'yup';
import {
  startOfHour,
  parseISO,
  isBefore,
  endOfHour,
  format,
  subHours,
} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    /* const { page = 1 } = req.query;

    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userID,
        canceled_at: null,
      },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
      limit: 20,
      offset: (page - 1) * 20, // pagina 1 = 1 a 20, pagina 2 = da pagina 2(conta ) ate +  20
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email', 'id'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['url', 'name', 'id', 'path'],
            },
          ],
        },
      ],
    });

    */

    return res.json({ status: 'em contrucao' });
  }
  /*
  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validatation error' });
    }

    const { provider_id, date } = req.body;


    const is_provider = await User.findOne({
      where: {
        provider: true,
        id: provider_id,
      },
    });

    if (!is_provider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointment with a provider' });
    }


    // zera os minutos e segundos da hora ex: 10:31 vira 10:00
    const hourStart = startOfHour(parseISO(date));
    const hourEnd = endOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({
        error:
          'It is not possible to create appointment before current time or same hour as now',
      });
    }


    // const hourStart = startOfHour(parseISO(date));
    // const hourEnd = endOfHour(parseISO(date));

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: {
          [Op.between]: [hourStart, hourEnd],
        },
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment data is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.userID,
      provider_id,
      date,
    });



    const user = await User.findByPk(req.userID);

    if (req.userID === provider_id) {
      return res.status(401).json({
        error: 'You cant create an appointment with yourself...',
      });
    }

    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' HH:mm'h'",
      {
        locale: pt,
      }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (!appointment) {
      return res.status(400).json({ error: 'appointment not found' });
    }

    if (appointment.user_id !== req.userID) {
      return res
        .status(401)
        .json({ error: 'appointment not found for this user' });
    }

    const dateWithSub = subHours(appointment.date, 2); // menos 2 horas

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'you can only delete appointment that will begin after 2 hours',
      });
    }
    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, { appointment });

    return res.json(appointment);
  }

  */
}

export default new MeetupController();
