import React, { Component } from 'react';
import axios from 'axios';

const api = {
  key: "1fc0b1615fce76c9b1effa4e67bd1c01",
  base: "https://api.openweathermap.org/data/2.5/"
}

class WeatherSearch extends Component {
    state = {
        searchPhrase: '',
        city: '',
        country: '',
        date: '',
        temp: null,
        weatherDescription: '',
        cod: ''
    }
    init = () => {
        return axios.get(`${api.base}weather?q=warsaw&units=metric&APPID=${api.key}`).then(
                response => {
                    this.setState({
                        city: response.data.name,
                        country: response.data.sys.country,
                        temp: response.data.main.temp,
                        weatherDescription: response.data.weather[0].main,
                        cod: response.cod
                    })
                }
            )
    }
    componentDidMount() {
        this.init();
    }

    handleInputChange(event) {
      const searchValue = event.target.value;
      this.setState({
        searchPhrase: searchValue
      })
    }

    search = () => {
      return axios.get(`${api.base}weather?q=${this.state.searchPhrase}&units=metric&APPID=${api.key}`)
        .then(response => {
          this.setState({
              city: response.data.name,
              country: response.data.sys.country,
              temp: response.data.main.temp,
              weatherDescription: response.data.weather[0].main
          })
        })
        .catch(() => {
            this.props.history.push('/404');
        })
}
    render() {


  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={(typeof this.state.weatherDescription != "undefined") ? ((this.state.temp>10) ? 'app warm' : 'app') : 'app'}>
     <div className="mask-background"></div>
      <main>
        <div className="search-box">
          <input
            type="text"
            className= "search-bar"
            placeholder="Search..."
            onChange={this.handleInputChange.bind(this)}
          />
          <button
            className="search-btn"
            onClick={this.search}
            > Search
          </button>
        </div>

        {(typeof this.state.searchPhrase != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{this.state.city}, {this.state.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
            {Math.round(this.state.temp)}°C
            </div>
            <div className="weather">{this.state.weatherDescription}</div>
          </div>
          </div>
          ) : ('')}
      </main>

    </div>
  )
}
}

export default WeatherSearch;
