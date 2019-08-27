import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react'

console.log(process.env.REACT_APP_WEATHER_API_KEY)

const Country = ( { country } ) => {
    const [ weather, setWeather ] = useState([])
    const [ location, setLocation ] = useState([]) 

    useEffect(() => {
        axios
          .get("http://api.apixu.com/v1/current.json?key="+ process.env.REACT_APP_WEATHER_API_KEY +"&q="+ country.name)
          .then(response => {
              setWeather(response.data.current)
              setLocation(response.data.location)
          })
    }, [])
        return (
          <Container>
            <Grid columns={3} divided>
            <Grid.Row>
              <Grid.Column>
                <div>
                    <h1>{country.name}</h1>  
                    <p>Capital: {country.capital}</p>
                    <p>Population: {country.population}</p>
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
                  <h2>Weather</h2>
                  {(!weather.condition) ?  "Hold on a sec, loading data..." :
                  <div>
                    <p>{weather.condition && weather.condition.text}</p>
                    <p>Temperature: {weather.temp_c} C°, {weather.temp_f} F</p>
                    <img src={weather.condition && weather.condition.icon} alt="weather icon" width="200px"/>
                  </div>
                  }
                </div>
              </Grid.Column>
              <Grid.Column>
               <div>
                <h2>Time in {location.name} is {location.localtime}</h2>
               </div>
              </Grid.Column>
            </Grid.Row>
            </Grid>
        </Container>
      
         
        )
        
      
}

export default Country;