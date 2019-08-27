import React from 'react'
import Country from './Country'

const Countries = (props) => {
    if (props.countriesToShow.length === 0) {
      return (
          "No country name matched your search"
      )
    } else if (props.countriesToShow.length > 10) {
        return (
          "Too many matches. Filter results by typing in the search bar!"
        )
      } else if (props.countriesToShow.length === 1) {
        const country = props.countriesToShow[0]
        return (
          <Country country={country} />
        )
      }
      return (
        <div>
        <h2>Countries: </h2>
        {props.countriesToShow.map(country => 
          <ul>
            <li key={country.capital}>{country.name}<button onClick={() => props.handleClick(country.name)}>show</button></li>
          </ul>)}
        </div>
      )   
}

export default Countries