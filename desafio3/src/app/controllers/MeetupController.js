import * as Yup from 'yup';
import {
  startOfHour,
  parseISO,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';
import Sequelize from 'sequelize';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userID,
      },
      order: ['date'],
    });

    return res.json(meetups);
  }

  async indexUser(req, res) {
    const dateStart = startOfHour(new Date());

    const meetups = await Meetup.findAll({
      order: [['date', 'asc']],
      where: {
        '$Subscriptions.user_id$': req.userID,
        date: { [Sequelize.Op.gt]: dateStart },
      },
      include: [
        {
          model: Subscription,
          require: true,
          attributes: [],
        },
      ],
    });

    return res.json(meetups);
  }

  async indexFilter(req, res) {
    const PERPAGE = 10;

    const schema = Yup.object().shape({
      date: Yup.date().required(),
      page: Yup.number().required(),
    });

    const validacao = await schema
      .validate(req.query, { abortEarly: false })
      .catch(err => Promise.resolve(err));

    if (validacao.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Erro na validação',
        msg: validacao.errors,
      });
    }

    const { page = 1, date } = req.query;

    const dateStart = startOfDay(parseISO(date));
    const dateEnd = endOfDay(parseISO(date));

    const meetups = await Meetup.findAll({
      where: {
        date: { [Sequelize.Op.between]: [dateStart, dateEnd] },
      },
      order: ['date'],
      limit: PERPAGE,
      offset: (page - 1) * PERPAGE,
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email', 'id'],
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner: Yup.number().required(),
    });

    const validacao = await schema
      .validate(req.body, { abortEarly: false })
      .catch(err => Promise.resolve(err));

    if (validacao.name === 'ValidationError') {
      console.log('error 1', validacao.errors);
      console.log(req.body);
      return res.status(400).json({
        error: 'Erro na validação',
        msg: validacao.errors,
      });
    }

    const { title, description, location, date, banner } = req.body;

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      console.log('error 2');

      return res.status(400).json({
        error:
          'It is not possible to create meetup before current time or same hour as now',
      });
    }

    // verifica se a imagem existe
    const bannerExists = await File.findByPk(banner);

    if (!bannerExists) {
      console.log('error 3');

      return res.status(400).json({
        error: 'banner id not found',
      });
    }

    const meetup = await Meetup.create({
      user_id: req.userID,
      title,
      description,
      location,
      file_id: banner,
      date,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      banner: Yup.number(),
    });

    const validacao = await schema
      .validate(req.body, { abortEarly: false })
      .catch(err => Promise.resolve(err));

    if (validacao.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Erro na validação',
        msg: validacao.errors,
      });
    }

    const meetup = await Meetup.findOne({
      where: {
        id: req.params.id,
        user_id: req.userID,
      },
    });

    if (!meetup) {
      return res.status(400).json({
        error: 'MeetUp not found or you are not the owner',
      });
    }

    const { title, description, location, date, banner } = req.body;

    if (title) {
      meetup.title = title;
    }
    if (description) {
      meetup.description = description;
    }
    if (location) {
      meetup.location = location;
    }
    if (date) {
      const hourStart = startOfHour(parseISO(date));

      if (isBefore(hourStart, new Date())) {
        return res.status(400).json({
          error:
            'It is not possible to update the meetup date before current time or same hour as now',
        });
      }

      meetup.date = date;
    }

    if (banner) {
      const bannerExists = await File.findByPk(banner);

      if (!bannerExists) {
        return res.status(400).json({
          error: 'banner id not found',
        });
      }
      meetup.file_id = banner;
    }

    await meetup.save();

    return res.send(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findOne({
      where: {
        user_id: req.userID,
        id: req.params.id,
      },
    });

    if (!meetup) {
      return res.status(400).json({
        error: 'meetup not found',
      });
    }

    if (isBefore(new Date(meetup.date), new Date())) {
      return res.status(400).json({
        error: 'it is not possible to cancel past meetups',
      });
    }

    await meetup.destroy();

    return res.json({ status: 'ok' });
  }
}

export default new MeetupController();
