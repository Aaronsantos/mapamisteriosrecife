
var user;

class LocationService{


  constructor(){

    throw new Error('Não é possível instanciar LocationService')
  }

  static isInSpaceRange(pointLocation, userLocation, range){

    let unit = 0.000009;
    console.log(range)
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


  }

  static getUserLocation(){

    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

  }

  static coordToName(loc) {

    url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.toString()}&key=${GetKey.key()}`

  }



}
