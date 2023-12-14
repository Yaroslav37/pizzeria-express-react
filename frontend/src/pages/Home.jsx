import { Component } from "react";
import axios from "axios";
import styles from "./Home.module.css";

const MINSK_LOCATION = {
  latitude: 53.9006,
  longitude: 27.559,
};

class Home extends Component {
  state = {
    weatherLoaded: false,
    weatherData: null,
    weatherLoadingError: null,
    currencyLoaded: false,
    currencyData: null,
    currencyLoadingError: null,
  };

  // TASK 6: Connect 3rd party API
  async componentDidMount() {
    try {
      const { data } = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: MINSK_LOCATION.latitude,
            longitude: MINSK_LOCATION.longitude,
            current: "temperature_2m,wind_speed_10m",
          },
        }
      );
      this.setState({ weatherData: data, weatherLoaded: true });
    } catch (e) {
      console.error(e);
      this.setState({ weatherLoadingError: e.message, weatherLoaded: true });
    }

    try {
      const { data } = await axios.get("https://api.coincap.io/v2/rates");
      this.setState({ currencyData: data.data, currencyLoaded: true });
    } catch (e) {
      console.error(e);
      this.setState({ currencyLoadingError: e.message, currencyLoaded: true });
    }
  }

  render() {
    if (this.state.weatherLoaded === false) {
      return <p>Weather is Loading...</p>;
    }

    if (this.state.currencyLoaded === false) {
      return <p>Currency is Loading...</p>;
    }

    return (
      <div>
        <h1>3rd party API</h1>
        <h2>Weather</h2>
        <div className={styles.weatherContainer}>
          <div>Location: Minsk</div>
          <div>
            Temperature: {this.state.weatherData.current.temperature_2m}{" "}
            {this.state.weatherData.current_units.temperature_2m}
          </div>
          <div>
            Wind speed: {this.state.weatherData.current.wind_speed_10m}{" "}
            {this.state.weatherData.current_units.wind_speed_10m}
          </div>
        </div>
        <h2>Currency</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Symbol</th>
              <th className={styles.th}>Currency Symbol</th>
              <th className={styles.th}>Type</th>
              <th className={styles.th}>Rate (USD)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.currencyData.map((item, index) => (
              <tr key={index}>
                <td className={styles.td}>{item.id}</td>
                <td className={styles.td}>{item.symbol}</td>
                <td className={styles.td}>{item.currencySymbol}</td>
                <td className={styles.td}>{item.type}</td>
                <td className={styles.td}>{item.rateUsd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Home;
