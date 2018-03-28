class CatalogoView extends View {

  _template(model) {

    let result = document.createElement('div')
    result.classList.add('cardSec')

    model.forEach( assombracao => {

      console.log(assombracao)
      let card = document.createElement('a')
      card.classList.add('card')

      let cardContent = document.createElement('div')
      console.log(cardContent.classList)
      cardContent.classList.add('card-content','colorBgRed')


      cardContent.innerHTML = `<img src="img/monstesNoPic.png" class="card-pic">
                              <div class="card-info"> <ul> <li>${assombracao.local}</li> <li> </li> </ul> </div>
                              <h2 class="textdisplay1 ">${assombracao.nome}</h2>`


      card.appendChild(cardContent)
      result.appendChild(card)
    })

    return result
  }
}
