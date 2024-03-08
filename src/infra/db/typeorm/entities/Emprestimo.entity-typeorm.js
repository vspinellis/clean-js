const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Emprestimo',
  tableName: 'emprestimos',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    usuario_id: {
      type: 'int'
    },
    livro_id: {
      type: 'int'
    },
    data_retorno: {
      type: 'date'
    },
    data_saida: {
      type: 'date'
    },
    data_devolucao: {
      type: 'date',
      nullable: true
    }
  },
  relations: {
    usuario: {
      target: 'Usuario',
      type: 'many-to-one',
      joinColumn: {
        name: 'usuario_id',
        referencedColumnName: 'id'
      }
    },
    livro: {
      target: 'Livro',
      type: 'many-to-one',
      joinColumn: {
        name: 'livro_id',
        referencedColumnName: 'id'
      }
    }
  }
});
