
class Controller {

constructor() {

  let service = new AssombracaoService()
    service
    .requestAssombracoes()
    .then( list => {
      console.log(list)
      this._assombracoes = list
      this._user = null //localização do usuario
      this._assombracoesInRange = []
      this._assombracoesDescobertas = [] //log de descobertas

      this._catalogView = new CatalogoView(document.querySelector('#catalog'))
      this._catalogView.update(this._assombracoes.assombracoes)
    })

      //this._mapa = document.querySelector('#mapa')

  }

get assombracoes() {
  return (this._assombracoes.assombracoes)
}

get userLocation(){
  return this._user
}

get assombracoesPerto(){
  //TODO: IMPLEMENTAR CARREGAMENTO E VIEW
}

get assombracoesDescobertas() {

  //TODO: implementar separação das assombracoes descobertas
}

}
