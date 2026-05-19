class UsuarioDTO {
  
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

  
  static paraLista(usuarios) {
    return usuarios.map((user) => this.paraResposta(user));
  }
}

module.exports = UsuarioDTO;
