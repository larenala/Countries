import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMitten } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react'

const Country = ( { country } ) => {
    const [ weather, setWeather ] = useState([])
    const [ conditions, setConditions ] = useState([])
    const [ celsius, setCelsius ] = useState(0)
    const [ coordinates, setCoordinates ] = useState([])
    const [ wind, setWind ] = useState([])
    const [ timezone, setTimezone ] = useState([]) 
    const [ uvIndex, setUvIndex ] = useState([])

    useEffect(() => {
        axios
          .get("http://api.openweathermap.org/data/2.5/weather?q=" + country.capital + "&units=imperial&APPID="+ process.env.REACT_APP_WEATHER_API_KEY)
          .then(response => {
            console.log('response ', response.data)
            setWeather(response.data.weather[0])
            setConditions(response.data.main)
            const tempCelsius = ((response.data.main.temp - 32)*5)/9
            setCelsius(Math.round(tempCelsius))
            setTimezone(response.data.timezone)
            setCoordinates(response.data.coord)
            setWind(response.data.wind)
          })
    },[])

    useEffect(() => {
      axios
        .get("http://api.openweathermap.org/data/2.5/uvi?appid="+ process.env.REACT_APP_WEATHER_API_KEY+"&lat=" + coordinates.lat+ "&lon="+coordinates.lon)
        .then(response => {
          console.log('response 2 ', response.data)
          setUvIndex(response.data)
        })
    }, [])

        return (
          <Container>
            <Grid textAlign='center' stackable columns={3} divided>
            <Grid.Row>
              <Grid.Column>
                <div>
                    <h1>{country.name}</h1>  
                    <p><strong>Capital: </strong>{country.capital}</p>
                    <p><strong>Population: </strong>{country.population.toLocaleString('en', {useGrouping:true})}</p>
                    <h2>Languages</h2>
                    <ul>
                    {country.languages.map(item => 
                        <li key={item.name}>{item.name}</li>
                    )}
                    </ul>
                    <br/>                      
                    <img src={country.flag} alt="flag" width="200px" />
                </div>
              </Grid.Column>
              <Grid.Column>
                <div>
                  <h2>Weather in {country.capital}</h2>
                  {(!weather.main) ?  "Hold on a sec, trying to load data..." :
                  <div>
                    <p className="capitalized">{weather.description}</p>
                    <p><strong>Temperature: </strong>{celsius} °C, {Math.round(conditions.temp)} °F</p>
                    <p><strong>Humidity: </strong>{conditions.humidity}%</p>
                    <img src={"http://openweathermap.org/img/wn/" + weather.icon +"@2x.png"} alt="weather icon" width="200px"/>
                  </div>
                  }
                </div>
              </Grid.Column>
              <Grid.Column>
               <div>
                <h2>What to wear outside</h2>
                <div>
                  <p>It's quite warm! Put on a t-shirt and shorts.</p>
                  <FontAwesomeIcon icon={faMitten} />
                </div>
                <h2>Timezone in {country.name} is {timezone}</h2>
               </div>
              </Grid.Column>
            </Grid.Row>
            </Grid>
        </Container>
      
         
        )
        
      
}

export default Country;