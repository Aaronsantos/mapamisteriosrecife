


class AssombracoesRepo {

  static getAssombracoes() {

      return lista
  }

}

ConnectionFactory
  .getConnection()
  .then(conexao => {

    new AssombracaoDao(conexao)
      .get()
      .then(assombracoes =>{
        assombracoes.forEach(a => console.log(a))
      })
  })
