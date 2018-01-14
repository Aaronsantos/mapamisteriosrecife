class ListaAssombracao {

  constructor (assombracoes){

    this._assombracoes = assombracoes;
  }

  insere(assombracao) {

    this._assombracoes.push(assombracao);
  }

  get assombracoes(){

    return [].concat(this._assombracoes);
  }

  remove(id){

    for( a in this._assombracoes){
      if(a.id == id)
        a.splice(this._assombracoes.indexOf(a) - 1, 1);
    }
  }

}
