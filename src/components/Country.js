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

    useEffect(() => {
        axios
          .get("http://api.openweathermap.org/data/2.5/weather?q=" + country.capital + "&units=imperial&APPID="+ process.env.REACT_APP_WEATHER_API_KEY)
          .then(response => {
            console.log('response ', response.data)
            setWeather(response.data.weather[0])
            setConditions(response.data.main)
            const tempCelsius = ((response.data.main.temp - 32)*5)/9
            setCelsius(Math.round(tempCelsius))
            const date = new Date()
            let time = date.getTime()
            console.log('time ', time)
            const timenow = time + (response.data.timezone*1000)
            console.log('time ', time)
            const newDate = new Date(timenow)
            console.log('newDate ', newDate)
            const newTime = new Date(timenow).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })
            console.log('new time ', newTime)
            setTimezone(newTime)
            setCoordinates(response.data.coord)
            setWind(response.data.wind)
          })
    },[])

        return (
          <Container>
            <Grid textAlign='center' stackable columns={3} divided>
            <Grid.Row className="content-container">
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
                    <img src={"http://openweathermap.org/img/wn/" + weather.icon +"@2x.png"} alt="weather icon" width="200px" className="weather-icon"/>
                  </div>
                  }
                </div>
              </Grid.Column>
              <Grid.Column>
               <div>
                <h2>Time in {country.capital} is {timezone}</h2>
               </div>
              </Grid.Column>
            </Grid.Row>
            </Grid>
        </Container>
      
         
        )
        
      
}

export default Country;