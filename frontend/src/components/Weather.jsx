import styles from "./Weather.module.css";

// TASK 9.2 - Props with default values
const Weather = ({
  temperature = "N/A",
  temperatureUnits = "C",
  windSpeed = "N/A",
  windSpeedUnits = "km/h",
}) => {
  return (
    <div className={styles.weatherContainer}>
      <div>Location: Minsk</div>
      <div>
        Temperature: {temperature} {temperatureUnits}
      </div>
      <div>
        Wind speed: {windSpeed} {windSpeedUnits}
      </div>
    </div>
  );
};

export default Weather;
