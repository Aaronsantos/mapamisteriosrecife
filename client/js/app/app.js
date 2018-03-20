
class Controller {

constructor () {

      ConnectionFactory.getConnection()
        .then( conexao => new AssombracaoDao(conexao).getAssombracoes())
        .then(list => {
          if(list.length > 0)
            this._assombracoes = list
          else console.log('Requisição...')
            //ASSOMBRAÇÃO SERVICE:
              //REALIZAR REQUISIÇÃO
              //ADICIONAR EM _assombracoes
              //PERSISTIR NO IDB
        })

      //this._mapa = document.querySelector('#mapa')
      this._user = null //localização do usuario
      this._assombracoesInRange = []
      this._assombracoesDescobertas = [] //log de descobertas
  }

_checkLocalStore(){

  return ConnectionFactory.getConnection()
  .then( conexao => new AssombracaoDao(conexao).getAssombracoes())
  .then(list => list.length > 0)
}


}
