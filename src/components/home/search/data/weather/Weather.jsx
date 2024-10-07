import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../../../../config';
import './weather.css';
import WeatherIcon from './WeatherIcon';

export default function Weather({ lat, lon }) {

    const [tempCelsius, setTempCelsius] = useState(null);
    const [tempFahrenheit, setTempFahrenheit] = useState(null);
    const [description, setDescription] = useState(null);
    const [icon, setIcon] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [windSpeedKPH, setWindSpeedKPH] = useState(null);
    const [windSpeedMPH, setWindSpeedMPH] = useState(null);

    useEffect(() => {
        getWeatherData(lat, lon);
    }, [])

    // get data from backend
    const getWeatherData = async (lat, lon) => {

        const data = {
            lat: lat,
            lon: lon,
            units: "metric", // metric: Celsius | imperial: Fahrenheit
            lang: "en"
        }

        await axios.post(`${url}/weather/info`, data).then((res) => {

            if (res.status === 200) {
                setTempCelsius(Math.trunc(res.data.main.temp))
                setTempFahrenheit((Math.trunc(res.data.main.temp) * 9/5) +32)
                setDescription(res.data.weather[0].description)
                setIcon(res.data.weather[0].icon)
                setHumidity(res.data.main.humidity)
                setWindSpeedKPH(res.data.wind.speed)
                setWindSpeedMPH(Math.round(res.data.wind.speed)/1.609344)
            }

        }).catch(err => {
            return;
        })
    }

    return (
        <li>
            {(tempCelsius && description && icon) &&
                <div className={"weather "+ (icon.includes("d") ? "w-day" : "w-night")}>
                      <div className="data1">
                            <p><i className="bi bi-moisture"/><span>{humidity}%</span></p>
                            <p><i className="bi bi-wind"/><span>{Math.round(windSpeedKPH)}km/h</span></p>
                            <p><i className="bi bi-wind"/><span>{Math.round(windSpeedMPH)}mph</span></p>
                        </div>
                        <div className="data2">
                            <p><b>{tempCelsius}</b><sup>°C</sup> | <b>{Math.trunc(tempFahrenheit)}</b><sup>°F</sup></p>
                            <p><span>{description}</span></p>
                            <p><span>{icon.includes("d") ? "day" : "night"}</span></p>
                        </div>
                        <WeatherIcon icon={icon} />
                </div>
            }
        </li>
    )
}
