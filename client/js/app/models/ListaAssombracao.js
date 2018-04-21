import {Assombracao} from './Assombracao.js'

export class ListaAssombracao {

  constructor (assombracoes){

    this._assombracoes = assombracoes;
  }

  insere(assombracao) {

    this._assombracoes.push(assombracao);
  }

  get assombracoes(){

    return [].concat(this._assombracoes);
  }

  getAssombracaoById(local,id) {

    let a = this._assombracoes.find(as => as.id == id)
    if(a && (LocationService.isInSpaceRange(a.coords, local,a.range) || a.status == true))
      return a
    else
      return null
  }

  remove(id){

    for( a in this._assombracoes){
      if(a.id == id)
        a.splice(this._assombracoes.indexOf(a) - 1, 1);
    }
  }

}
