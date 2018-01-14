

var lista = new ListaAssombracao([
  {
  id: 991,
  nome: 'Teste1',
  coords: {lat: -7.816543, lng: -34.916423},
  local: 'Rua Olinda',
  descricao: 'Teste teste teste teste teste\n TEEEEEEEEEESTE LOREM IPSUM TESTESTES\nfim',
  epoca: 'Sec XIX',
  range: 100,
  img: [],
  status: false,
  tipo: 1
},
{
  id: 992,
  nome: 'Teste2',
  coords: {lat: -7.817936, lng: -34.915779},
  local: 'Rua Olinda',
  descricao: 'Teste teste teste teste teste\n TEEEEEEEEEESTE LOREM IPSUM TESTESTES\nfim',
  epoca: 'Sec XIX',
  range: 100,
  img: [],
  status: false,
  tipo: 2
}])



class AssombracoesRepo {

  static getAssombracoes() {

      return lista
  }

}
