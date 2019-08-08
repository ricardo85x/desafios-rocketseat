import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Meetup from '../models/Meetup';
import File from '../models/File';

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
      return res.status(400).json({
        error: 'Erro na validação',
        msg: validacao.errors,
      });
    }

    const { title, description, location, date, banner } = req.body;

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({
        error:
          'It is not possible to create meetup before current time or same hour as now',
      });
    }

    // verifica se a imagem existe
    const bannerExists = await File.findByPk(banner);

    if (!bannerExists) {
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
