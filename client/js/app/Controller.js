
import {Assombracao} from './models/Assombracao.js'
import {ListaAssombracao} from './models/ListaAssombracao.js'
import {AssombracaoService} from './services/AssombracaoService.js'
import {ConnectionFactory} from './services/ConnectionFactory.js'
import {LocationService} from './services/LocationService.js'
import {CatalogoView} from './views/CatalogView.js'
import {MapView} from './views/MapView.js'
import {ModalHTML} from './views/modal.js'

export class Controller {

constructor() {

  this._service = new AssombracaoService()

  this._assombracoesInRange = []
  this._assombracoesDescobertas = [] //log de descobertas

  this._infoModal = new ModalHTML(document.querySelector('#modal'))
  this._catalogView = new CatalogoView(document.querySelector('#catalog'),this._infoModal)
  this._map = document.querySelector('#map')
  this._mapView = null
  this._locationStatus = false //painel de info só aparecerá para quem estiver com locationstatus true

  let mapBtn = document.querySelector('#porPertoBtn')

  mapBtn.addEventListener('click', event =>{

    event.preventDefault()
    console.log(this)
    this.mapView = MapView.generateMap(this._user, this._map, this._assombracoes.assombracoes, this._infoModal)
    })

  }


async init() {

  this._assombracoes = await this._service.requestAssombracoes()
  this._catalogView.update(this._assombracoes.assombracoes)

  try {
    this._user = await LocationService.getUserLocation()
    this._locationStatus = true
  }catch(e){
    this._user = {lat : -8.058156, lng: -34.870786}
  }


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
