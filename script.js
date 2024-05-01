
window.onload = async function () {

    async function fetchWeatherDataByCity(city) {
        const API_KEY = '3b4f0b8a5cc2abfb9499c835d099849a';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Unable to fetch to weather data. Please ensure correct location is enterd!');
            }
            
            return await response.json();
        } catch (error) {
        
            throw error;
        }
    }

    async function fetchWeatherDataByCoord(lon, lat) {
        const API_KEY = '3b4f0b8a5cc2abfb9499c835d099849a';
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Unable to fetch to weather data. Please ensure correct location is enterd!');
            }
            return await response.json();
        } catch (error) {
             
            throw error;
        }
    }

    function updateWeather(weatherData) {
       
        wa_heading.innerHTML = weatherData.name ? weatherData.name : '';
        wa_desc.innerHTML = weatherData.main.temp && weatherData.weather[0].description ? weatherData.main.temp + '°C, ' + weatherData.weather[0].description : '';
        wa_loc.innerHTML = weatherData.name && weatherData.sys.country ? weatherData.name + ', ' + weatherData.sys.country : '';
        wa_long.innerHTML = weatherData.coord && weatherData.coord.lon ? 'Longitude: ' + weatherData.coord.lon.toFixed(2) + '°' : '';
        wa_lat.innerHTML = weatherData.coord && weatherData.coord.lat ? 'Latitude: ' + weatherData.coord.lat.toFixed(2) + '°' : '';
        wa_max_temp.innerHTML = weatherData.main && weatherData.main.temp_max ? 'Max Temp: ' + weatherData.main.temp_max + '°C' : '';
        wa_min_temp.innerHTML = weatherData.main && weatherData.main.temp_min ? 'Min Temp: ' + weatherData.main.temp_min + '°C' : '';
        wa_humidity.innerHTML = weatherData.main && weatherData.main.humidity ? 'Humidity: ' + weatherData.main.humidity + '%' : '';
        wa_pressure.innerHTML = weatherData.main && weatherData.main.pressure ? 'Pressure: ' + weatherData.main.pressure + ' hpa' : '';
        wa_deg.innerHTML = weatherData.wind && weatherData.wind.deg ? 'Deg: ' + weatherData.wind.deg + '°' : '';
        wa_gust.innerHTML = weatherData.wind && weatherData.wind.gust ? 'Gust: ' + weatherData.wind.gust + ' meter/sec' : '';
        wa_speed.innerHTML = weatherData.wind && weatherData.wind.speed ? 'Speed: ' + weatherData.wind.speed + ' meter/sec' : '';
        wa_img.src = weatherData.weather && weatherData.weather[0].icon ? `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` : '';

    }

    function getLocation() {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    async function showPosition(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        try {
            
            var weatherData = await fetchWeatherDataByCoord(longitude, latitude);
            updateWeather(weatherData);

        } catch(error) {
            wa_err.innerHTML = error;
            console.error(error);
        }
        
    }

    getLocation();

    wa_search_btn.addEventListener('click', async function(e) {
        e.preventDefault();
        wa_err.innerHTML = "";
        
        var city = wa_search_value.value;
        city = city.trim();
        
        try {
            
            var weatherData = await fetchWeatherDataByCity(city);
            updateWeather(weatherData);

        } catch(error) {
            wa_err.innerHTML = error;
            console.error(error);
        }

    })
}