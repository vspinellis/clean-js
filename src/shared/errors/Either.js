/**
 * @description: ATENÇÃO, esta classe não deve ser instânciada diretamente, use um dos métodos Left ou Right
 */
module.exports = class Either {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  static Left(left) {
    return new Either(left, null);
  }

  static Right(right) {
    return new Either(null, right);
  }

  static valorJaCadastrado(valor) {
    return { message: `${valor} já cadastrado.` };
  }
};
