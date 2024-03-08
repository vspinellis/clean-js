## Reunião

> Somos uma biblioteca pequena e gostariamos de controlar a nossa entrada e saída de livros. Queremos cadastrar o usuário que irá pegar o livro emprestado, cadastrar os livros da nossa biblioteca e poder emprestar os livros para qualquer usuário, além de buscar os registros de empréstimos.


## Dados
- Usuario: [nome_completo, CPF, telefone, endereco, email]
- Livro: [nome, quantidade, autor, genero, ISBN]
- Emprestimo: [usuario_id, livro_id, data_retorno, data_devolucao, data_saida]

## UseCases (Regras de negócio)
[X] Cadastrar um novo usuário
[X] - CPF ou email devem ser únicos

[X] Buscar um cadastro de usuário por CPF
[X] - Retornar um usuário ou vazio

[X] Cadastrar um novo livro
[X] - ISBN deve ser único

[X] Buscar um livro por nome ou ISBN
[X] - Retornar os livros ou vazio

[X] Emprestar um livro ao usuario
[X] - A data de retorno não pode ser menor que a data de saída
[X] - Um usuário não pode estar com mais de um livro com o mesmo ISBN ao mesmo tempo
[X] - Um usuário pode estar com mais de um livro com ISBN diferentes ao mesmo tempo
[X] - Ao cadastrar um empréstimo, será enviado um email automaticamente informando o nome do livro, nome do usuário, CPF, a data de saída e a data de retorno

[X] Devolver o livro emprestado sem multa
[X] - Caso o usuário tenha atrasado, será gerada uma multa fixa de R$ 10,00

[X] Mostrar todos os empréstimos pendentes, com o nome do livro, nome do usuário, CPF, data de saída e data de retorno. Ordenados pela data de retorno mais antiga

## Estruturas

## UsuariosRepository
[X] cadastrar: ({nome_completo, CPF, telefone, endereco, email}) => Promise<void>
[X] buscarPorCPF: (CPF) => Promise<Usuario | null>
[X] existePorCPF: (CPF) => Promise<boolean>
[X] existePorEmail: (email) => Promise<boolean>

## livrosRepository
[X] cadastrar: ({ nome, quantidade, autor, genero, ISBN}) => Promise<void>
[X] existePorISBN: (ISBN) => Promise<boolean>
[X] buscarPorNomeOuISBN: (valor) => Promise<array<Livro>>

## emprestimosRepository
[X] emprestar: ({ livro_id, usuario_id, data_saida, data_retorno }) => Promise<void>
[X] existeLivroISBNEmprestadoPendenteUsuario: ({usuario_id, livro_id}) => Promise<void>
[X] buscarEmprestimoComLivroComUsuarioPorID: (id) => Promise<Emprestimo & {Livro: {nome}, Usuario: {nome_completo, CPF, email}}>
[X] devolver: ({ emprestimo_id, data_devolucao }) => Promise<{data_retorno}>
[X] buscarPendentesComLivroComUsuario: () => Promise<Emprestimos: {data_saida, data_retorno & Livro: {nome}, Usuario : {nome_completo, CPF}}>