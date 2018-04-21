
export class ModalHTML{

  constructor(tag){

    this._titulo = tag.querySelector('header h1')
    this._img = tag.querySelector('.picSec img')
    this._infoList = tag.querySelectorAll('.infoSec ul li')
    this._text = tag.querySelector('.textSec')
    this._Mapbutton = tag.querySelector('input[name="goMap"]')

    this._close = tag.querySelector('input[name="close"]')

    this._close.onclick = function(event) {
      modal.style.display = 'none'
    }


    let modal = document.querySelector('#modal')  
    window.onclick = function(event){

    if(event.target == modal ){
      modal.style.display = 'none'
      }
    }

  }

  _update(a) {

    console.log('criou')

    this._titulo.innerText = a.nome

    this._img.src = a.img != false ? a.img : "img/monstesNoPic.png"
    this._img.alt = a.nome

    let sections = ['local', 'epoca', 'tipo' ]
    let cont = 0
    this._infoList.forEach(li => {
      li.innerText = `${sections[cont]}: ${a[sections[cont]]}`
      cont++
    })

    let texto = a.descricao.split('\n')

    this._text.innerText = ''
    texto.forEach( par => {
      let p = document.createElement('p')
      p.classList.add('textbody1')
      p.innerText = par
      this._text.appendChild(p)
    })

    modal.style.display = 'block'

    //this._Mapbutton.onclick = TODO ABRIR MAPA
  }

  open(a){
    if(this._titulo.innerText == a.nome)
      modal.style.display = 'block'
    else {
      this._update(a)
    }
  }
}
