const nodemailer = require('../../../infra/email/nodemailer');

module.exports = {
  key: 'SendMail',
  async handle({ data }) {
    const { data_saida, data_retorno, usuario, livro } = data;
    await nodemailer().enviarEmail({
      data_saida,
      data_retorno,
      nome_usuario: usuario.nome_completo,
      CPF: usuario.CPF,
      email: usuario.email,
      nome_livro: livro.nome
    });
  }
};
