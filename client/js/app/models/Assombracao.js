class Assombracao {

  constructor(id, nome, coords, local, descricao,epoca) {

      this._id = id;
      this._nome = nome;
      this._local = local; //DESCRIÇÃO TEXTUAL DA LOCALIZAÇÃO
      this._coords = coords; //COORDS DOS LOCAIS DE APARIÇÃO NO FORMATO {lat: , lng: }
      this._descricao = descricao; //TEXTO DESCRIÇÃO
      this._epoca = epoca; //EPOCA DE APARIÇÃO OU CONSTRUÇÃO
      this._img = [] //IMGS
      this._range = 10 //RANGE DE DETECÇÃO 
  }

  addImg(source, alttext){
    this._img.push({src: source, alt: alttext})
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
}
