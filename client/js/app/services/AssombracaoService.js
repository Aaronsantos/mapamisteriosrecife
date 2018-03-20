class AssombracaoService {

  constructor() {

    this._http = new HttpService()
  }

  requestAssombracoes() {

    //analisa se precisa fazer requisição
    console.log('Requisitando assombrações')
    return this._getRemoteVersion()
      .then( flag => {
        if(flag[0])
          throw new Error('Armazenamento local já atualizado')
        else
          // INFERNOOOOOOo!!!!!!
          return this._http.get('https://mapa-misterios-recife.firebaseio.com/assombracoes.json').then(list => [list].concat(flag))
      })
  }

  syncLocalStorage() {
    console.log('entrou')
    return this.requestAssombracoes()
      .then(list => {
          ConnectionFactory.getConnection(c => {
            logDao = new logDao(c)
            asDao = new AssombracaoDao(c)
            console.log('Daos criados')

            Promise.all([
              logDao.delData(),
              list[0].forEach(a => asDao.add(a)), //FUNCIONA? 
              logDao.add(list[1])
            ])
            .then(result => {
              console.log('Realizadas as promisses')
              console.log(result.join('\n'))
              return true
            })
            .catch( e => {
              console.log(e)
              return e
            })
          })
      })


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
