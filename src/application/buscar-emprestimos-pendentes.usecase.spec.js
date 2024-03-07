const buscarEmprestimosPendentesUseCase = require('./buscar-emprestimos-pendentes.usecase');

describe('Buscar emprestimos pendentes UseCase', function () {
  const emprestimosRepository = {
    buscarPendentesComLivroComUsuario: jest.fn()
  };

  test('Deve ser possível buscar os empréstimos pendentes', async function () {
    emprestimosRepository.buscarPendentesComLivroComUsuario.mockResolvedValue([
      {
        usuario: {
          nome: 'qualquer_nome_usuario',
          CPF: 'qualquer_cpf'
        },
        livro: {
          nome: 'qulalquer_nome_livro'
        }
      },
      {
        usuario: {
          nome: 'qualquer_nome_valido',
          CPF: 'qualquer_cpf_valido'
        },
        livro: {
          nome: 'qulalquer_nome_livro_valido'
        }
      }
    ]);
    const sut = buscarEmprestimosPendentesUseCase({ emprestimosRepository });
    const output = await sut();

    expect(output.right).toHaveLength(2);
    expect(output.right[0].usuario.nome).toBe('qualquer_nome_usuario');
  });
});
