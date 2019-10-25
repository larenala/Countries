import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Countries from "./components/Countries"
import { Container, Input, Menu } from 'semantic-ui-react'

const App = () => {
  
  const [ countries, setCountries ] = useState([])
  const [ searchString, setSearchString ] = useState('')

  const textInput = React.createRef()

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

  const clearSearchForm = (event) => {
    setSearchString('')
    if(textInput) textInput.current.focus()
  }

  const countriesToShow = searchString.length > 0 
    ? countries.filter(c => c.name.toLowerCase().includes(searchString.toLowerCase())) 
    : countries

  return (
    <>
    <Menu stackable>
        <Menu.Item header>Countries and Weather App </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input 
              id="searchField" 
              icon='search' 
              autoFocus 
              placeholder='Search...' 
              onChange={handleChange} 
              value={searchString} 
              ref={ textInput }
            />
          </Menu.Item>
          <Menu.Item
          name='clear'
          onClick={clearSearchForm}
        />
        </Menu.Menu>
      </Menu>
    <Container>     
      <Countries 
        countriesToShow={countriesToShow} 
        handleClick={(s) => setSearchString(s)}
      />
    </Container>
    </>
  )
}

export default App;
