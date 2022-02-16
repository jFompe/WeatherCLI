require('dotenv').config()

const {
  inquirerMenu,
  readInput, 
  wait,
  selectFromList,
} = require('./helpers/inquirer')
const { SearchEngine } = require('./models/searchEngine')



const main = async () => {

  const searchEngine = new SearchEngine()
  let option

  do {
    
    option = await inquirerMenu()

    switch (option) {
      case 1: // Search city
        // Request city input
        const cityName = await readInput('City:')
        // Search places 
        const places = await searchEngine.searchPlacesByName(cityName)
        // Select place
        const placeId = await selectFromList(places)
        const city = places.find(p => p.id === placeId)
        searchEngine.addSearch(city.name)
        // Weather
        const weather = await searchEngine.searchWeatherByCity(city)
        // Show results
        console.log('\n City information:\n'.green)
        console.log('City:', city.name)
        console.log('Lat:', city.lat)
        console.log('Lng:', city.lng)
        console.log('Weather:', weather.desc)
        console.log('Min:', weather.temp_min)
        console.log('Max:', weather.temp_max)
        break
      
      case 2: // History
        searchEngine.history.forEach((p,i) => {
          console.log(`${i+1}. ${p}`);
        })
        break
    
    }

    await wait()

  } while (option !== 0)

}

main()