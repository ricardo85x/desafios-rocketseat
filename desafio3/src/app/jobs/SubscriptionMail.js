import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    console.log('DEB 1');
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    console.log('a fila executou!', data);
    const { meetup, user, organizer } = data;
    await Mail.sendMail({
      to: `${organizer.name} <${organizer.email}>`,
      subject: `MeetUp - Subscrition to ${meetup.title}`,
      template: 'subscription',
      context: {
        organizer,
        user,
        meetup,
        date: format(
          parseISO(meetup.date),
          "'dia' dd 'de' MMMM', às' HH:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new SubscriptionMail();
