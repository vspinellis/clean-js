const nodemailer = require('nodemailer');

module.exports = function nodemailerService() {
  const enviarEmail = async function ({
    data_saida,
    data_retorno,
    nome_usuario,
    CPF,
    email,
    nome_livro
  }) {
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'faba4b8d96d8b2',
        pass: '441237210384f0'
      }
    });

    await transporter.sendMail({
      from: '"Biblioteca UNI" <contato@uni.com>',
      to: email,
      subject: 'Novo livro emprestado',
      text: `Olá ${nome_usuario}(${CPF}), você pegou o livro '${nome_livro}' emprestado dia ${data_saida} e deverá devolver dia ${data_retorno}. Boa leitura!`
    });
  };

  return { enviarEmail };
};
