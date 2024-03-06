const buscarLivrosPorNomeOuIsbnUseCase = require('./buscar-livros-por-nome-ou-isbn.usecase');

describe('Buscar livros por nome ou ISBN UseCase', function () {
  const livrosRepository = {
    buscarPorNomeOuISBN: jest.fn()
  };
  test('Deve retornar um livro válido ao buscar por nome ou ISBN existente', async function () {
    const nomeISBNDTO = {
      valor: 'valor_valido'
    };

    const outputDTO = [
      {
        id: 'id_valido',
        nome: 'valor_valido',
        autor: 'autor_valido',
        genero: 'genero_valido',
        ISBN: 'valor_valido'
      }
    ];
    livrosRepository.buscarPorNomeOuISBN.mockResolvedValue(outputDTO);

    const sut = buscarLivrosPorNomeOuIsbnUseCase({ livrosRepository });
    const output = await sut(nomeISBNDTO);

    expect(output.right).toEqual(outputDTO);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledWith(nomeISBNDTO.valor);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um array vazio quando não existir um livro com o nome ou ISBN informados', async function () {
    livrosRepository.buscarPorNomeOuISBN.mockResolvedValue([]);
    const nomeISBNDTO = {
      valor: 'valor_nao_cadastrado'
    };

    const sut = buscarLivrosPorNomeOuIsbnUseCase({ livrosRepository });
    const output = await sut(nomeISBNDTO);

    expect(output.right).toEqual([]);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenLastCalledWith(nomeISBNDTO.valor);
    expect(livrosRepository.buscarPorNomeOuISBN).toHaveBeenCalledTimes(1);
  });
});
