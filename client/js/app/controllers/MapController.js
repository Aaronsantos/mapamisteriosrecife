
class MapController {

  constructor (location, lista) {

      this._assombracoes = lista
      this._mapa = document.querySelector('#mapa')
      this._user = location
      this._assombracoesInRange = []
      this._assombracoesDescobertas = [] //log de descobertas 

  }

  refreshMap() {
    MapView.generateMap(this._user, MapView.getMapStyle(), this._mapa, this._assombracoes.assombracoes)
  }

  static initMap(){
    MapView.generateMap({lat:-8.062087, lgn: -34.872552}, MapView.getMapStyle(), this._mapa, this._assombracoes.assombracoes)

  }

  listInRange() {

    this._assombracoesInRange = this._assombracoes.assombracoes.
      filter(a => LocationService.isInSpaceRange(a.coords,this._user, a.range))
      alert(this._assombracoesInRange.length + " Assombrações perto")


  }



}
