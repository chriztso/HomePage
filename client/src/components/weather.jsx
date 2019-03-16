import React from 'react';
import weather from './weather.css';

class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
        <div className={weather.weatherStyle}>
          <div className={weather.headerBox}>
          <h3 className={weather.weatherHeader}> Weather </h3>
          </div>
        </div>
        )
    }
}

export default Weather;