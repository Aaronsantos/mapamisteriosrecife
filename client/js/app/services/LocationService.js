
var user;

class LocationService{


  constructor(){

    throw new Error('Não é possível instanciar LocationService')
  }

  static isInSpaceRange(pointLocation, userLocation, range){

    let unit = 0.000009;
    let latMax = pointLocation.lat + (unit * range);
    let latMin = pointLocation.lat - (unit * range);
    let lngMax = pointLocation.lng + (unit * range);
    let lngMin = pointLocation.lng - (unit * range);

    if( (userLocation.lat <= latMax && userLocation.lat >= latMin) && (userLocation.lng <= lngMax && userLocation.lng >= lngMin) )
      return true;
    else
      return false;
  }


  static _PromiseUserLocation(){
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  static getUserLocation(){
    return new Promise(function (resolve, reject) {

      LocationService._PromiseUserLocation()
      .then(  loc => {
        let user = {lat : loc.coords.latitude, lng : loc.coords.longitude}
        resolve(user)
      } )
      .catch(e => {
          reject(e)
      })
    })
  }

  static coordToName(loc) {

    url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.toString()}&key=${GetKey.key()}`

  }



}
