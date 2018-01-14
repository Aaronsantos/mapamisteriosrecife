class MapView{

  static generateMap(position, style, tag, list) {
    console.log(position)
    var map = new google.maps.Map(tag, {
      zoom: 19,
      center: position,
      styles: style
    });
    //teste renderizar marcador
    let userMarker = new google.maps.Marker({
      position: position,
      map: map
    })

    list.forEach( a => {

        // let infowindow = new google.maps.InfoWindow({
        //   content: MapView._generateInfoWindow(a)
        // })

        let marker = new google.maps.Marker({
        position: a.coords,
        map: map
      })
      marker.addListener('click', function(){
        modalHTML.geraModalInfo(a)
      })


    })
  }

  static getMapStyle(id) {

    return [{
              "stylers": [
                {"hue": "#ff1a00"},
                {"invert_lightness": true},
                {"saturation": -100},
                {"lightness": 33},
                {"gamma": 0.5}
                ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#2D333C"}]
          }]
  }

  static _generateInfoWindow(assombracao) {

    return `<div id="content">
      <div id="siteNotice">
      </div>
      <h1 id="firstHeading" class="firstHeading">${assombracao.nome}</h1>
      <div id="bodyContent">
        <p>${assombracao.descricao}</p>
      </div>
  </div>`
  }

}
