const devolverLivroUseCase = require('./devolver-livro.usecase');

describe('Devolver livro UseCase', function () {
  const emprestimosRepository = {
    devolver: jest.fn()
  };

  test('Deve ser possível devolver um livro sem multa', async function () {
    emprestimosRepository.devolver.mockResolvedValue({
      data_retorno: new Date('2024-02-16')
    });
    const devolverLivroDTO = {
      emprestimo_id: 'qualquer_id',
      data_devolucao: new Date('2024-02-16')
    };

    const sut = devolverLivroUseCase({ emprestimosRepository });
    const output = await sut(devolverLivroDTO);

    expect(output.right).toEqual('Multa por atraso: R$ 0');
    expect(emprestimosRepository.devolver).toHaveBeenCalledWith(devolverLivroDTO);
    expect(emprestimosRepository.devolver).toHaveBeenCalledTimes(1);
  });
});
