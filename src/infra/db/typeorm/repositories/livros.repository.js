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

  return { cadastrar };
};

module.exports = { livrosRepository, typeormLivrosRepository };
