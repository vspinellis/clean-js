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
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
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
