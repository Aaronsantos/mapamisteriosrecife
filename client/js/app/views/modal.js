
const modal = document.querySelector('.modal')
window.onclick = function(event){

  if(event.target == modal ){

    modal.style.display = 'none'

  }

}

class ModalHTML{

  static geraModalInfo(a){

      let texto = a.descricao.split('\n')
      let result =
      `<div class="infoModal colorBgWhite">
        <header class="colorBgRed">
          <h1 class="texttitle colorTxtWhite">${a.nome}</h1>
        </header>
        <section>
          <ul class="panel">
            <li class="textbody2">Local: <strong class="colorTxtRed">${a.local}</strong></li>
            <li class="textbody2">Época: <strong class="colorTxtRed">${a.epoca}</strong></li>
          </ul> `


          texto.forEach( p => result += `<p class="textbody1">${p}</p>`)

          result += ` </section> <section class="picSec">`


          a.img.forEach( img => result +=`<img src="${img.src}" alt="${img.alt}">`)

          result += `</section></div>`

        modal.innerHTML = result;

        modal.style.display = 'block'
  }

  static geraModalDistante(a){
    let texto = a.descricao.split('\n')
    let result =
    `<div class="infoModal colorBgWhite">
      <header class="colorBgRed">
        <h1 class="texttitle colorTxtWhite">${a.nome}</h1>
      </header>
      <section>
        <ul class="panel">
          <li class="textbody2">Local: <strong class="colorTxtRed">${a.local}</strong></li>
          <li class="textbody2">Época: <strong class="colorTxtRed">???</strong></li>
        </ul> `

        result += `<p> Você se encontra distânte desta assombração deseja saber como chegar até ela?</p>`

        result += ` </section> </div>`


      modal.innerHTML = result;

      modal.style.display = 'block'
  }

}
