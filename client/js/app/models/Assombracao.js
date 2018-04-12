class Assombracao {

  constructor(nome, json,status) {

      this._id = json.id;
      this._nome = nome;
      this._local = json.local; //DESCRIÇÃO TEXTUAL DA LOCALIZAÇÃO
      this._localCurto = json.localCurto
      this._coords = json.coords; //COORDS DOS LOCAIS DE APARIÇÃO NO FORMATO {lat: , lng: }
      this._descricao = json.descricao; //TEXTO DESCRIÇÃO
      this._epoca = json.epoca; //EPOCA DE APARIÇÃO OU CONSTRUÇÃO
      this._img = json.img //IMGS
      this._range = json.range //RANGE DE DETECÇÃO
      this._status = status
      this._tipo = json.tipo
  }

  addImg(source, alttext){
    this._img.push({src: source, alt: alttext})
  }

  get localCurto() {

    return this._localCurto
  }
  
  get nome() {

    return this._nome;
  }

  get local() {

    return this._local;
  }

  get coords() {

    return this._coords;
  }

  get epoca() {

    return this._epoca;
  }

  get descricao() {

    return this._descricao;
  }

  get id() {

    return this._id;
  }

  get img() {

    return [].concat(this._img)
  }

  get tipo() {

    return this._tipo
  }

  get status() {
    return this._status
  }
}
