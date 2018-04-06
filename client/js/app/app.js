
class Controller {

constructor() {

  let service = new AssombracaoService()
    service.requestAssombracoes()
    .then( list => {
      console.log(list)
      this._assombracoes = list
      this._user = {lat : -8.058156, lng: -34.870786} //localização do usuario
      this._assombracoesInRange = []
      this._assombracoesDescobertas = [] //log de descobertas

      this._infoModal = new ModalHTML(document.querySelector('#modal'))

      this._catalogView = new CatalogoView(document.querySelector('#catalog'),this._infoModal)
      this._catalogView.update(this._assombracoes.assombracoes)

      this._map = document.querySelector('#map')
      this._mapView = null

      let mapBtn = document.querySelector('.mainMenu .menuContent ul li[name="porPerto"]')

      mapBtn.addEventListener('click', event =>{

        event.preventDefault()
        console.log(this)
        this.mapView = MapView.generateMap(this._user, this._map, this._assombracoes.assombracoes)
      })

    })



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
