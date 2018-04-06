class HttpService {

    _handleErrors(res) {
        if(!res.ok) throw new Error(res.statusText)
        return res
    }

    async get(url) {
        return fetch(url)
              .then(res => this._handleErrors(res))
              .then(res => res.json())
    }

    async post(url, dado) {

            return fetch(url, {
              headers: { 'Content-type' : 'application/json'},
              method: 'post',
              body: JSON.stringify(dado)
            })
            .then(res => this._handleErrors(res))
        }
}
