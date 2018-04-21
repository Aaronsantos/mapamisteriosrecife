export class View{

  constructor(tag) {

    this._tag = tag
  }

  template() {

    throw new Error('Método template precisa ser implementado.')
  }

  update(model) {
    this._tag.appendChild(this._template(model)) 
  }
}
