const { Like } = require('typeorm');
const { typeormServer } = require('../setup');

const typeormLivrosRepository = typeormServer.getRepository('Livro');

const livrosRepository = function () {
  const cadastrar = async function ({ nome, quantidade, autor, genero, ISBN }) {
    await typeormLivrosRepository.save({
      nome,
      quantidade,
      autor,
      genero,
      ISBN
    });
  };

  const existePorISBN = async function (ISBN) {
    const livro = await typeormLivrosRepository.count({
      where: {
        ISBN
      }
    });

    return livro === 0 ? false : true;
  };

  const buscarPorNomeOuISBN = async function (valor) {
    const livro = await typeormLivrosRepository.find({
      where: [{ nome: Like(`%${valor}%`) }, { ISBN: valor }]
    });

    return livro;
  };

  return { cadastrar, existePorISBN, buscarPorNomeOuISBN };
};

module.exports = { livrosRepository, typeormLivrosRepository };
