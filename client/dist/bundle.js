/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Assombracao {

  constructor(nome, json, status) {

    this._id = json.id;
    this._nome = nome;
    this._local = json.local; //DESCRIÇÃO TEXTUAL DA LOCALIZAÇÃO
    this._localCurto = json.localCurto;
    this._coords = json.coords; //COORDS DOS LOCAIS DE APARIÇÃO NO FORMATO {lat: , lng: }
    this._descricao = json.descricao; //TEXTO DESCRIÇÃO
    this._epoca = json.epoca; //EPOCA DE APARIÇÃO OU CONSTRUÇÃO
    this._img = json.img; //IMGS
    this._range = json.range; //RANGE DE DETECÇÃO
    this._status = status;
    this._tipo = json.tipo;
  }

  addImg(source, alttext) {
    this._img.push({ src: source, alt: alttext });
  }

  get localCurto() {

    return this._localCurto;
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

    return [].concat(this._img);
  }

  get tipo() {

    return this._tipo;
  }

  get status() {
    return this._status;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Assombracao;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Assombracao_js__ = __webpack_require__(0);


class ListaAssombracao {

  constructor(assombracoes) {

    this._assombracoes = assombracoes;
  }

  insere(assombracao) {

    this._assombracoes.push(assombracao);
  }

  get assombracoes() {

    return [].concat(this._assombracoes);
  }

  getAssombracaoById(local, id) {

    let a = this._assombracoes.find(as => as.id == id);
    if (a && (LocationService.isInSpaceRange(a.coords, local, a.range) || a.status == true)) return a;else return null;
  }

  remove(id) {

    for (a in this._assombracoes) {
      if (a.id == id) a.splice(this._assombracoes.indexOf(a) - 1, 1);
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ListaAssombracao;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionFactory; });
var ConnectionFactory = function () {

  var stores = ['assombracoes', 'version', 'log'];
  var version = 2;
  var dbName = 'assombracoes';

  var connection = null;
  var close = null;

  return class ConnectionFactory {
    constructor() {

      throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }

    static getConnection() {

      return new Promise((resolve, reject) => {

        let openRequest = window.indexedDB.open(dbName, version);

        openRequest.onupgradeneeded = e => {
          ConnectionFactory._createStores(e.target.result);
        };

        openRequest.onsuccess = e => {

          if (!connection) {
            connection = e.target.result;
            close = connection.close.bind(connection);
            connection.close = function () {
              throw new Error("Não é possível fechar uma conexão diretamente");
            };
          }
          resolve(connection);
        };

        openRequest.onerror = e => {
          console.log(e.target.error);
          reject(e.target.error.name);
        };
      });
    }

    static _createStores(connection) {
      stores.forEach(store => {

        if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

        connection.createObjectStore(store, { autoIncrement: true });
      });
    }

    static closeConnection() {

      if (connection) {
        close();
        connection = null;
      }
    }

  };
}();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Dao {

  constructor(connection, store) {

    this._connection = connection;
    this._store = store;
  }

  add(assombracao) {

    return new Promise((resolve, reject) => {

      let request = this._requestStore().add(assombracao); // na store adiciona assombracao

      request.onsuccess = e => {
        resolve();
      };

      request.onerror = e => {
        console.log(e.target.error);
        reject(`Não foi possível adicionar ${this._store} ao armazenamento local`);
      };
    });
  }

  getData() {

    return new Promise((resolve, reject) => {

      let cursor = this._requestStore().openCursor();

      let data = [];

      cursor.onsuccess = e => {

        let atual = e.target.result;

        if (atual) {

          let dado = atual.value;
          data.push(dado);
          atual.continue();
        } else {
          resolve(data);
        }
      };

      cursor.onerror = e => {

        console.log(e.target.error);
        reject('Não foi possível recuperar dados no armazenamento local');
      };
    });
  }

  delData() {

    return new Promise((resolve, reject) => {

      let request = this._requestStore().clear();

      request.onsuccess = e => {
        resolve(`${this._store} apagadas do armazenamento local`);
      };

      request.onerror = e => {
        console.log(e.target.error);
        reject(`Não foi possível apagar ${this._store} em armazenamento local`);
      };
    });
  }

  _requestStore() {
    return this._connection //CONEXÃO
    .transaction([this._store], 'readwrite') //acessa uma transação
    .objectStore(this._store);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Dao;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Controller_js__ = __webpack_require__(5);


let app = new __WEBPACK_IMPORTED_MODULE_0__Controller_js__["a" /* Controller */]();
app.init();

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_Assombracao_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_ListaAssombracao_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_AssombracaoService_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_ConnectionFactory_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_LocationService_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_CatalogView_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_MapView_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_modal_js__ = __webpack_require__(14);










class Controller {

  constructor() {

    this._service = new __WEBPACK_IMPORTED_MODULE_2__services_AssombracaoService_js__["a" /* AssombracaoService */]();

    this._assombracoesInRange = [];
    this._assombracoesDescobertas = []; //log de descobertas

    this._infoModal = new __WEBPACK_IMPORTED_MODULE_7__views_modal_js__["a" /* ModalHTML */](document.querySelector('#modal'));
    this._catalogView = new __WEBPACK_IMPORTED_MODULE_5__views_CatalogView_js__["a" /* CatalogoView */](document.querySelector('#catalog'), this._infoModal);
    this._map = document.querySelector('#map');
    this._mapView = null;
    this._locationStatus = false; //painel de info só aparecerá para quem estiver com locationstatus true

    let mapBtn = document.querySelector('#porPertoBtn');

    mapBtn.addEventListener('click', event => {

      event.preventDefault();
      console.log(this);
      this.mapView = __WEBPACK_IMPORTED_MODULE_6__views_MapView_js__["a" /* MapView */].generateMap(this._user, this._map, this._assombracoes.assombracoes, this._infoModal);
    });
  }

  async init() {

    this._assombracoes = await this._service.requestAssombracoes();
    this._catalogView.update(this._assombracoes.assombracoes);

    try {
      this._user = await __WEBPACK_IMPORTED_MODULE_4__services_LocationService_js__["a" /* LocationService */].getUserLocation();
      this._locationStatus = true;
    } catch (e) {
      this._user = { lat: -8.058156, lng: -34.870786 };
    }
  }

  get assombracoes() {
    return this._assombracoes.assombracoes;
  }

  get userLocation() {
    return this._user;
  }

  get assombracoesPerto() {
    //TODO: IMPLEMENTAR CARREGAMENTO E VIEW
  }

  get assombracoesDescobertas() {

    //TODO: implementar separação das assombracoes descobertas
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Controller;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_Assombracao_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_ListaAssombracao_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__HttpService_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ConnectionFactory_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dao_AssombracaoDao_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dao_LogDao_js__ = __webpack_require__(9);








class AssombracaoService {

  constructor() {

    this._http = new __WEBPACK_IMPORTED_MODULE_2__HttpService_js__["a" /* HttpService */]();
  }

  requestAssombracoes() {
    console.log('Requisitando assombrações');

    return Promise.all([this._http.get('https://mapa-misterios-recife.firebaseio.com/assombracoes.json'), this._syncLocalStorage()]).then(response => {

      let assombracoes = response[0];
      let assombracoesDescobertas = response[1];

      let listaAssombracao = []; //IMPLEMENTAR CRIANDO INSTANCIA DE ASSOMBRACAO

      Object.keys(assombracoes).forEach(key => {
        listaAssombracao.push(new __WEBPACK_IMPORTED_MODULE_0__models_Assombracao_js__["a" /* Assombracao */](key, assombracoes[key], assombracoesDescobertas.includes(response[0][key].id)));
      });
      return new __WEBPACK_IMPORTED_MODULE_1__models_ListaAssombracao_js__["a" /* ListaAssombracao */](listaAssombracao);
    });
  }

  _syncLocalStorage() {
    console.log('entrou');
    return [].concat(__WEBPACK_IMPORTED_MODULE_3__ConnectionFactory_js__["a" /* ConnectionFactory */].getConnection().then(c => new __WEBPACK_IMPORTED_MODULE_5__dao_LogDao_js__["a" /* LogDao */](c).getData()));
  }

  _getRemoteVersion() {

    console.log('Analizando versão do storage');
    return Promise.all([this._http.get('https://mapa-misterios-recife.firebaseio.com/meta.json'), __WEBPACK_IMPORTED_MODULE_3__ConnectionFactory_js__["a" /* ConnectionFactory */].getConnection().then(c => new __WEBPACK_IMPORTED_MODULE_5__dao_LogDao_js__["a" /* LogDao */](c).getData())]).then(response => {
      if (response[0].version == response[1].version) {
        console.log('Storage atualizado');
        return [true];
      } else {
        console.log('Storage desatualizado');
        return [false, response[1].version];
      }
    }).catch(e => {
      throw new Error(e);
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = AssombracaoService;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class HttpService {

    _handleErrors(res) {
        if (!res.ok) throw new Error(res.statusText);
        return res;
    }

    async get(url) {
        return fetch(url).then(res => this._handleErrors(res)).then(res => res.json());
    }

    async post(url, dado) {

        return fetch(url, {
            headers: { 'Content-type': 'application/json' },
            method: 'post',
            body: JSON.stringify(dado)
        }).then(res => this._handleErrors(res));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HttpService;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dao_js__ = __webpack_require__(3);


class AssombracaoDao extends __WEBPACK_IMPORTED_MODULE_0__Dao_js__["a" /* Dao */] {

  constructor(connection) {
    super(connection, 'assombracoes');
  }

}
/* unused harmony export AssombracaoDao */


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dao_js__ = __webpack_require__(3);


class LogDao extends __WEBPACK_IMPORTED_MODULE_0__Dao_js__["a" /* Dao */] {

  constructor(connection) {
    super(connection, 'log');
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LogDao;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class LocationService {

  constructor() {

    throw new Error('Não é possível instanciar LocationService');
  }

  static isInSpaceRange(pointLocation, userLocation, range) {

    let unit = 0.000009;
    let latMax = pointLocation.lat + unit * range;
    let latMin = pointLocation.lat - unit * range;
    let lngMax = pointLocation.lng + unit * range;
    let lngMin = pointLocation.lng - unit * range;

    if (userLocation.lat <= latMax && userLocation.lat >= latMin && userLocation.lng <= lngMax && userLocation.lng >= lngMin) return true;else return false;
  }

  static _PromiseUserLocation() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  static getUserLocation() {
    return new Promise(function (resolve, reject) {

      LocationService._PromiseUserLocation().then(loc => {
        let user = { lat: loc.coords.latitude, lng: loc.coords.longitude };
        resolve(user);
      }).catch(e => {
        reject(e);
      });
    });
  }

  static coordToName(loc) {

    url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.toString()}&key=${GetKey.key()}`;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = LocationService;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__View_js__ = __webpack_require__(12);


class CatalogoView extends __WEBPACK_IMPORTED_MODULE_0__View_js__["a" /* View */] {

  constructor(tag, modal) {

    super(tag);
    this._modal = modal;
  }

  _template(model) {

    let result = document.createElement('div');
    result.classList.add('cardSec');

    model.forEach(assombracao => {

      console.log(assombracao);
      let card = document.createElement('a');
      card.classList.add('card');

      card.addEventListener("click", () => {
        this._modal.open(assombracao);
      });

      let cardContent = document.createElement('div');
      console.log(cardContent.classList);
      cardContent.classList.add('card-content', 'colorBgRed');

      cardContent.innerHTML = `<img src="img/monstesNoPic.png" class="card-pic">
                              <div class="card-info"> <ul> <li class="textbody1">${assombracao.localCurto}</li>
                              <li class="textbody1">${assombracao.tipo}</li> </ul> </div>
                              <h2 class="textdisplay1 ">${assombracao.nome}</h2>`;

      card.appendChild(cardContent);
      result.appendChild(card);
    });

    return result;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CatalogoView;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class View {

  constructor(tag) {

    this._tag = tag;
  }

  template() {

    throw new Error('Método template precisa ser implementado.');
  }

  update(model) {
    this._tag.appendChild(this._template(model));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = View;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MapView {

  static generateMap(position, tag, list, modal) {

    let map = new google.maps.Map(tag, {
      zoom: 19,
      center: position,
      styles: MapView._getMapStyle()
    });
    //teste renderizar marcador
    // let userMarker = new google.maps.Marker({
    //   position: position,
    //   map: map
    // })

    list.forEach(a => {

      // let infowindow = new google.maps.InfoWindow({
      //   content: MapView._generateInfoWindow(a)
      // })

      let marker = new google.maps.Marker({
        position: a.coords,
        map: map
      });

      marker.addListener('click', function () {
        modal.open(a);
      });
    });

    return map;
  }

  static _getMapStyle(id) {

    return [{
      "stylers": [{ "hue": "#ff1a00" }, { "invert_lightness": true }, { "saturation": -100 }, { "lightness": 33 }, { "gamma": 0.5 }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{ "color": "#2D333C" }]
    }];
  }

  static _generateInfoWindow(assombracao) {

    return `<div id="content">
      <div id="siteNotice">
      </div>
      <h1 id="firstHeading" class="firstHeading">${assombracao.nome}</h1>
      <div id="bodyContent">
        <p>${assombracao.descricao}</p>
      </div>
  </div>`;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = MapView;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class ModalHTML {

  constructor(tag) {

    this._titulo = tag.querySelector('header h1');
    this._img = tag.querySelector('.picSec img');
    this._infoList = tag.querySelectorAll('.infoSec ul li');
    this._text = tag.querySelector('.textSec');
    this._Mapbutton = tag.querySelector('input[name="goMap"]');

    this._close = tag.querySelector('input[name="close"]');

    this._close.onclick = function (event) {
      modal.style.display = 'none';
    };

    let modal = document.querySelector('#modal');
    window.onclick = function (event) {

      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  }

  _update(a) {

    console.log('criou');

    this._titulo.innerText = a.nome;

    this._img.src = a.img != false ? a.img : "img/monstesNoPic.png";
    this._img.alt = a.nome;

    let sections = ['local', 'epoca', 'tipo'];
    let cont = 0;
    this._infoList.forEach(li => {
      li.innerText = `${sections[cont]}: ${a[sections[cont]]}`;
      cont++;
    });

    let texto = a.descricao.split('\n');

    this._text.innerText = '';
    texto.forEach(par => {
      let p = document.createElement('p');
      p.classList.add('textbody1');
      p.innerText = par;
      this._text.appendChild(p);
    });

    modal.style.display = 'block';

    //this._Mapbutton.onclick = TODO ABRIR MAPA
  }

  open(a) {
    if (this._titulo.innerText == a.nome) modal.style.display = 'block';else {
      this._update(a);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ModalHTML;


/***/ })
/******/ ]);