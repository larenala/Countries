import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import Country from './Country'

const Countries = (props) => {
    if (props.countriesToShow.length === 0) {
      return (
        <div className="ui center aligned segment content-container">
          <h2>Try again!</h2>
          <p>No country name matched your search</p>
          <p>Press clear next to the search field to search again.</p>
        </div>
      )
    } else if (props.countriesToShow.length > 10) {
        return (
          <div className="ui center aligned segment content-container">
            <div className="text-content">
              <h2>Find countries and weather conditions</h2>
              <p>
                Search by typing in the search bar. 
              </p>
              <p>
                Results are only shown if there are fewer than 10 countries that match the search,
                so keep typing!
              </p>
            </div>
            <div className="icon-europe">
              <FontAwesomeIcon icon={faGlobeEurope} className="icon-europe fa-10x" />
            </div>     
          </div>     
        )
      } else if (props.countriesToShow.length === 1) {
        const country = props.countriesToShow[0]
        return (
          <Country country={country} />
        )
      }
      return (
        <div className="ui center aligned segment">
        <h2>Search results: </h2>
        {props.countriesToShow.map(country => 
          <ul className="ui segment list-content">
            <li key={country.capital} className="ui center aligned">{country.name}</li>
            <Button 
              className="ui right floated right labeled icon green button" 
              onClick={() => props.handleClick(country.name)}>
              <i class="right arrow icon"></i>
              Go!
            </Button>            
          </ul>)}
        </div>
      )   
}

export default Countries