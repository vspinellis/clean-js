const { Either } = require('../shared/errors');
const emprestarLivrosUsecase = require('./emprestar-livros.usecase');

describe('Emprestar livro UseCase', function () {
  const emprestimosRepository = {
    emprestar: jest.fn(),
    existeLivroISBNEmprestadoPendenteUsuario: jest.fn()
  };

  test('Deve poder emprestar um livro', async function () {
    const emprestarLivroDTO = {
      livro_id: 'qualquer_livro_id',
      usuario_id: 'qualquer_usuario_id',
      data_saida: new Date('2024-02-16'),
      data_retorno: new Date('2024-02-16')
    };

    const sut = emprestarLivrosUsecase({ emprestimosRepository });
    const output = await sut(emprestarLivroDTO);

    expect(output.right).toBeNull();
    expect(emprestimosRepository.emprestar).toHaveBeenCalledWith(emprestarLivroDTO);
    expect(emprestimosRepository.emprestar).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um Either.left se a data de retorno for menor que a data de saída', async function () {
    const emprestarLivroDTO = {
      livro_id: 'qualquer_livro_id',
      usuario_id: 'qualquer_usuario_id',
      data_saida: new Date('2024-02-16'),
      data_retorno: new Date('2024-02-15')
    };

    const sut = emprestarLivrosUsecase({ emprestimosRepository });
    const output = await sut(emprestarLivroDTO);

    expect(output.left).toBe(Either.dataRetornoMenorQueDataSaida);
  });
});
