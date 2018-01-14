
const modal = document.querySelector('.modal')
window.onclick = function(event){

  if(event.target == modal ){

    modal.style.display = 'none'

  }

}

class modalHTML{

  static geraModalInfo(a){
      console.log(a)
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

          console.log(a.img)
          a.img.forEach( img => result +=`<img src="${img.src}" alt="${img.alt}">`)

          result += `</section></div>`

        modal.innerHTML = result;

        modal.style.display = 'block'
  }

}
