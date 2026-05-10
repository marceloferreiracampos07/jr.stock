class UsuarioDTO {
  /**
   * Transforma um objeto do banco de dados em um formato seguro para o frontend.
   */
  static paraResposta(usuario) {
    if (!usuario) return null;

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      cargo: usuario.cargo,
      criado_em: usuario.createdAt,
    };
  }

  /**
   * Transforma uma lista de usuários.
   */
  static paraLista(usuarios) {
    return usuarios.map((user) => this.paraResposta(user));
  }
}

module.exports = UsuarioDTO;
