export default {
  host: 'smtp.mailtrap.io',
  port: '2525',
  secure: false,
  auth: {
    user: 'd80e18548bc187',
    pass: 'f34d19ca6034cd',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};

/* rename this file to mail.js */
/*
 Providers:
  Amazon SES
  Mailgun
  Sparkpost
  Mandril( mailchimp)


  para funcionar em dev existe o
  Mailtrap ( nao funciona online, apenas em dev local)
*/
