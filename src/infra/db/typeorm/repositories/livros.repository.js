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

  return { cadastrar, existePorISBN };
};

module.exports = { livrosRepository, typeormLivrosRepository };
