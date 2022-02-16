const fs = require('fs')

const axios = require('axios')

class SearchEngine {

  history = []
  dbPath = './db/searchs.json'

  constructor() {
    this.loadFromDB()
  }

  get history() {
    return this.history
  }

  get mapboxParams() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    }
  }

  buildOpenweatherParams(city = {}) {
    return {
      'lat': city.lat,
      'lon': city.lng,
      'appid': process.env.OPENWEATHER_KEY,
      'units': 'metric',
      'lang': 'es'
    }
  }

  async searchPlacesByName(city = '') {

    const instance = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ city }.json`,
      params: this.mapboxParams
    })

    console.log('Searching...', city);

    try {
      const res = await instance.get()
      return res.data.features.map(p => ({
        id: p.id,
        name: p.place_name,
        lat: p.center[1],
        lng: p.center[0]
      }))
    } catch (error) {
      console.log(error);
      return []
    }
  }

  async searchWeatherByCity(city = {}) {

    const instance = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5/weather',
      params: this.buildOpenweatherParams(city)
    })

    try {
      const res = await instance.get()

      return {
        desc: res.data.weather[0].main,
        temp_min: res.data.main.temp_min,
        temp_max: res.data.main.temp_max
      }
    } catch (error) {
      console.log(error)
      return {}
    }
  }

  addSearch(place) {
    this.history.unshift(place)
    this.saveToDB()
  }

  loadFromDB() {
    if (!fs.existsSync(this.dbPath)) {
      return
    }
    this.history = JSON.parse(fs.readFileSync(this.dbPath))
  }

  saveToDB() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.history))
  }

}



module.exports = {
  SearchEngine
}