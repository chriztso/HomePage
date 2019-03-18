import React from 'react';
import weather from './weather.css';
import Axios from 'axios';
import key from './api.js';

class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zipCode: '',
            country: '',
            city: '',
            fahrenheit: ''
        }
    this.getWeather = this.getWeather.bind(this);   
    this.handleZipCode = this.handleZipCode.bind(this);  
    this.handleCountry = this.handleCountry.bind(this);   
    }

    getWeather(){
        var api = key.KEY;
        Axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipCode},${this.state.country}&APPID=${api}`)
        .then((data) => {this.setState({city : data.data.name});
                         this.setState({fahrenheit : Math.floor(1.8 * (data.data.main.temp - 273.15) + 32)})})    
        .catch((err) => {console.log(err)})
    }

    handleZipCode(event){
      this.setState({zipCode: event.target.value})
    }
    
    handleCountry(event){
        this.setState({country: event.target.value})
      }

    render(){
      if(this.state.fahrenheit){
      var temperature = this.state.fahrenheit + '°F';
      }
        return(
        <div className={weather.weatherStyle}>
          <div className={weather.headerBox}>
            <div>
             <h3 className={weather.weatherHeader}> Weather </h3>
            </div>
            <div>
             <img src="https://s3.us-east-2.amazonaws.com/chrismvp/weather.png" className={weather.image} />
             </div>
          </div>

          <div>
            <span className={weather.zipCode}>Zip Code:</span> <input type="text" onChange={this.handleZipCode} className={weather.zipCodeInput}></input>
          </div>

          <div>
            <span className={weather.country}>Country:</span> <input type="text" onChange={this.handleCountry} className={weather.countryInput}></input>
          </div>
         
          <div className={weather.goButton}> 
            <input type="submit" value = "Go" onClick={this.getWeather} className={weather.goButton}></input>
          </div>
          <div>
             <div> 
             <span ><h3 className={weather.city}>{this.state.city} </h3></span> 
             </div>
             <div>
             <span ><h4 className={weather.temperature}>{temperature}</h4></span> 
             </div>
          </div>
        </div>
        )
    }
}

export default Weather;