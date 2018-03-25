class Dao {

  constructor (connection,store) {

    this._connection = connection
    this._store = store
  }

  add(assombracao) {

    return new Promise( (resolve, reject) => {

        let request = this._requestStore()
          .add(assombracao) // na store adiciona assombracao

          request.onsuccess = e => {
            resolve()
          }

          request.onerror = e => {
            console.log(e.target.error)
            reject(`Não foi possível adicionar ${this._store} ao armazenamento local`)
          }
    })
  }

  getData(){

    return new Promise( (resolve, reject) => {

        let cursor = this._requestStore().openCursor()

        let data = []

        cursor.onsuccess = e => {

          let atual = e.target.result

          if(atual) {

            let dado = atual.value
            data.push(dado)
            atual.continue()

          }else {
            resolve(data)
          }
        }

        cursor.onerror = e => {

          console.log(e.target.error)
          reject('Não foi possível recuperar dados no armazenamento local')
        }
    })
  }

  delData() {

    return new Promise( (resolve,reject) => {

      let request = this._requestStore().clear()

      request.onsuccess = e => {
        resolve(`${this._store} apagadas do armazenamento local`)
      }

      request.onerror = e => {
        console.log(e.target.error)
        reject(`Não foi possível apagar ${this._store} em armazenamento local`)
      }
    })
  }

  _requestStore(){
      return  this._connection //CONEXÃO
      .transaction([this._store], 'readwrite') //acessa uma transação
      .objectStore(this._store)
  }

}
