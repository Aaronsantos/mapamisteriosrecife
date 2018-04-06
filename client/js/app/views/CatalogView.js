class CatalogoView extends View {


  constructor(tag,modal){

    super(tag)
    this._modal = modal
  }


  _template(model) {

    let result = document.createElement('div')
    result.classList.add('cardSec')

    model.forEach( assombracao => {

      console.log(assombracao)
      let card = document.createElement('a')
      card.classList.add('card')

      card.addEventListener("click", () => {
        this._modal.open(assombracao)
      })

      let cardContent = document.createElement('div')
      console.log(cardContent.classList)
      cardContent.classList.add('card-content','colorBgRed')


      cardContent.innerHTML = `<img src="img/monstesNoPic.png" class="card-pic">
                              <div class="card-info"> <ul> <li class="textbody1">${assombracao.local}</li>
                              <li class="textbody1">${assombracao.tipo == 1 ? "Entidade" : (assombracao.tipo == 2 ? "Local Assombrado" : "Local Misterioso")}</li> </ul> </div>
                              <h2 class="textdisplay1 ">${assombracao.nome}</h2>`


      card.appendChild(cardContent)
      result.appendChild(card)
    })

    return result
  }
}
