import * as Yup from 'yup';
import {
  // startOfHour,
  // endOfHour,
  // parseISO,
  isBefore,
  isSameHour,
} from 'date-fns';
import Subscription from '../models/Subscription';
import MeetUp from '../models/Meetup';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';
import User from '../models/User';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userID,
      },
      order: ['date'],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      meetup_id: Yup.number().required(),
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

    const { meetup_id } = req.body;

    const meetup = await MeetUp.findByPk(meetup_id);

    if (!meetup) {
      return res.status(400).json({
        error: 'meetup not found',
      });
    }

    if (meetup.user_id === req.userID) {
      return res.status(400).json({
        error: 'you cant subscribe your own meetup',
      });
    }

    if (isBefore(new Date(meetup.date), new Date())) {
      return res.status(400).json({
        error: 'it is not possible to subscribe past meetups',
      });
    }

    const subscriptionExists = await Subscription.findOne({
      where: {
        user_id: req.userID,
        meetup_id,
      },
    });

    if (subscriptionExists) {
      return res.status(400).json({
        error: 'you are already subscribed to this meetup',
      });
    }

    if (isSameHour(new Date(meetup.date), new Date())) {
      return res.status(400).json({
        error: 'na mesma hora',
      });
    }

    const user = await User.findByPk(req.userID);
    const organizer = await User.findByPk(meetup.user_id);

    const subscription = await Subscription.create({
      meetup_id,
      user_id: req.userID,
    });

    await Queue.add(SubscriptionMail.key, { meetup, user, organizer });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
