import React, { useState, useEffect } from 'react'
import '../App.css';
import { AiOutlineSearch } from "react-icons/ai";
const Weather = () => {
    const [weather, setweather] = useState(null)
    const [cityName, setCityName] = useState(null);
    const [cname, setcname] = useState('')
    useEffect(() => {
        async function myApi() {
                const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName || "srinagar"}&units=metric&appid=0d01210521439d7695bfb01a0b764a8d`);
                const data = await res.json();
                setweather(data)
        }
        myApi()
    }, [cityName])
   
    const handlename = (e) => {
        setcname(e.target.value);
    }

    const setName = (e) => {
        e.preventDefault();
        setCityName(cname)
    }


    return (
        <div className='center-div'>
            <form>
                <div className="form-group">
                    <input type="text" value={cname} placeholder='Enter CityName' onChange={handlename} />
                    <button onClick={setName} ><AiOutlineSearch /></button>
                </div>
            </form>
            {!weather || weather.cod == 404 ? (<p className='nodata'>no data found</p>) : (
                <div>
                    <div className='temp'>
                        <p>{`${weather.name}`}</p>
                        <p>{`${weather.main.temp}°C`}</p>
                        <p>{`${weather.weather[0].main}` }</p>
                    </div>
                    <div className='ext-info'>
                        {`Feels like ${weather.main.feels_like}`}°C
                    </div>
                    <div className='ext-info'>
                    {`Pressure ${weather.main.pressure}`}pa
                    </div>
                    <div className='ext-info'>
                        {`Temp_max ${weather.main.temp_max} | Temp_min ${weather.main.temp_min}`}
                    </div>
                </div>
                    
                
            )}


        </div>
    )
}

export default Weather
