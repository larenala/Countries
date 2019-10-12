import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react'

const Country = ( { country } ) => {
    const [ weather, setWeather ] = useState([])
    const [ temp, setTemp ] = useState([])
    const [ timezone, setTimezone ] = useState([]) 

    useEffect(() => {
        axios
          .get("http://api.openweathermap.org/data/2.5/weather?q=" + country.name + "&APPID="+ process.env.REACT_APP_WEATHER_API_KEY)
          .then(response => {
            console.log('response ', response.data)
              setWeather(response.data.weather[0])
              setTemp(response.data.main)
              setTimezone(response.data.timezone)
          })
    },[])
    console.log('location ', typeof(timezone))
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
                  {(!weather.main) ?  "Hold on a sec, loading data..." :
                  <div>
                    <p>{weather.description}</p>
                    <p>Temperature: {Math.floor(temp.temp)} F</p>
                    <p>Humidity: {temp.humidity}%</p>
                    <img src={"http://openweathermap.org/img/wn/" + weather.icon +"@2x.png"} alt="weather icon" width="200px"/>
                  </div>
                  }
                </div>
              </Grid.Column>
              <Grid.Column>
               <div>
                <h2>Timezone in {country.name} is {timezone}</h2>
               </div>
              </Grid.Column>
            </Grid.Row>
            </Grid>
        </Container>
      
         
        )
        
      
}

export default Country;