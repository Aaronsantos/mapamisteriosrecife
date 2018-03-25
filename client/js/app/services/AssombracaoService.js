class AssombracaoService {

  constructor() {

    this._http = new HttpService()
  }

  requestAssombracoes() {
    console.log('Requisitando assombrações')

    return Promise.all([this._http.get('https://mapa-misterios-recife.firebaseio.com/assombracoes.json'), this._syncLocalStorage()])
    .then( response => {

      let assombracoes = response[0]
      let assombracoesDescobertas = response[1]

      let listaAssombracao = [] //IMPLEMENTAR CRIANDO INSTANCIA DE ASSOMBRACAO

      Object.keys(assombracoes).forEach( key => {
        listaAssombracao.push( new Assombracao(key, assombracoes[key], assombracoesDescobertas.includes(response[0][key].id)) )
      })
      return new ListaAssombracao(listaAssombracao)
    })
  }

  _syncLocalStorage() {
    console.log('entrou')
    return [].concat(ConnectionFactory.getConnection().then( c =>  new LogDao(c).getData() ) )
  }

  _getRemoteVersion() {

    console.log('Analizando versão do storage')
    return Promise.all([
      this._http.get('https://mapa-misterios-recife.firebaseio.com/meta.json'),
      ConnectionFactory.getConnection().then( c => new LogDao(c).getData() )
    ])
    .then(response => {
      if(response[0].version == response[1].version){
        console.log('Storage atualizado')
        return [true]
      }
      else{
        console.log('Storage desatualizado')
        return [false,response[1].version]
      }
    })
    .catch(e => {
      throw new Error(e)
    })

  }


}
