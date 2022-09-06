import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState({})
  const [degrees, setDegrees] = useState(true)

  useEffect( () => {
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
      const crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=ca7092903f070188c5880b2509b22b31`)
        .then(res => setData(res.data))
    }

  }, [])

  console.log(data)
  const clouds = "./src/assets/images/nublado.jpg"
  const rain = "./src/assets/images/lluvia.jpg"
  const sunny = "./src/assets/images/soleado.jpg"

  let background = data.weather?.[0].main
  {
    background === "Clouds" ? (
      document.body.style = `background-image: url(${clouds})`
      ) : (
        background === "Rain" ? (
          document.body.style = `background-image: url(${rain})`
        ) : (
            background === "Sunny" ? (
              document.body.style = `background-image: url(${sunny})`
            ) : (
              document.body.style = `background-image: url(${sunny})`
            )
          )
        )
  }
  let celsius = data.main?.temp - 273.15

  return (
    <div className="App">

      <div className='contenedor'>
        <h1 className='tittle'>Weather app</h1>
        <h2 className='country'> {data.name}, {data.sys?.country} </h2>

        <img className='img--weather' src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}.png`} alt="" />
        <div className='datos'>
        <p>" {data.weather?.[0].description} "</p> 
        <p><i class="fa-solid fa-wind"></i> wind speed : {data.wind?.speed} </p>
        <p><i class="fa-solid fa-cloud"></i> clouds : {data.clouds?.all} % </p>
        <p><i class="fa-solid fa-water"></i> humidity : {data.main?.humidity} % </p>
        </div>
        <p className='temp'><i class="fa-solid fa-temperature-three-quarters"></i> temp: {degrees ? `${celsius.toFixed(2)}°C`:`${((celsius*1.8)+32).toFixed(2)}°F`} </p>
        <button onClick={ () => setDegrees(!degrees) } className='degrees'>Degrees °F/°C </button>
      </div>

    </div>
  )
}

export default App
