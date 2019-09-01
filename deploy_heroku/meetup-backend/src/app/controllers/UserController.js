import * as Yup from 'yup';
import User from '../models/User';
// import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6, 'senha deve ter ao menos 6 caracteres'),
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

    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário ja existe!' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é um campo obrigatório'),
      email: Yup.string()
        .email()
        .required('Email é um campo obrigatório'),
      oldPassword: Yup.string().min(
        6,
        'A senha atual deve ter ao menos 6 caracteres'
      ),
      password: Yup.string()
        .min(6, 'Sua nova senha deve ter ao menos 6 caracteres')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword
            ? field.required(
                'Para atualizar a senha é necessario preencher a senha antiga'
              )
            : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required()
              .oneOf(
                [Yup.ref('password')],
                'Para atualizar a senha é necessario confirmar a nova senha'
              )
          : field
      ),
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

    const { email, oldPassword } = req.body;

    if (email === '') {
      return res.status(400).json({ error: 'Email invalido' });
    }

    const user = await User.findByPk(req.userID);

    if (email !== user.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res.status(400).json({ error: 'alguem ja pegou este email' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha errada' });
    }

    const { id, name, email: newEmail } = await user.update(req.body);

    return res.json({ id, name, email: newEmail });
  }
}

export default new UserController();
