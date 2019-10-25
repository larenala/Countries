import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Countries from "./components/Countries"
import { Container, Input, Menu } from 'semantic-ui-react'

const App = () => {
  
  const [ countries, setCountries ] = useState([])
  const [ searchString, setSearchString ] = useState('')

  useEffect (() =>  {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)  
      })
  }, [])

  const handleChange = (event) => {
    setSearchString(event.target.value)
  }

  const countriesToShow = searchString.length > 0 
    ? countries.filter(c => c.name.toLowerCase().includes(searchString.toLowerCase())) 
    : countries

  return (
    <Container>
      <Menu stackable>
        <Menu.Item header>Countries and Weather App </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' onChange={handleChange} value={searchString} />
          </Menu.Item>
          <Menu.Item
          name='clear'
          onClick={() => setSearchString('')}
        />
        </Menu.Menu>
      </Menu>
      <Countries 
        countriesToShow={countriesToShow} 
        handleClick={(s) => setSearchString(s)}
      />
    </Container>
  )
}

export default App;
