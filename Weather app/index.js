const apikey= "f608fbebcc56caeb97b621d45fbcf077";

const weatherData= document.getElementById("weather-data");
const cityInput= document.getElementById("city-input");

const formEl = document.querySelector("form")

formEl.addEventListener("submit", ()=>{
    event.preventDefault();
    const cityValue= cityInput.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&unit=metric`)
        if (!response.ok){
            throw new Error("Network response was not ok")
        }

        const data= await response.json();
        console.log(data);
        
        const temperature = Math.round((data.main.temp)-273);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.main.speed}m/s`,
        ];

        weatherData.querySelector(".icon").innerHTML = `<img
        src="http://openweathermap.org/img/wn/${icon}.png"
        alt="Weather Icon"
      />`;
        weatherData.querySelector(".temperature").textContent = `${temperature}`;
        weatherData.querySelector(".description").textContent = description;

        weatherData.querySelector(".details").innerHTML = details.map(
            (detail)=> `<div>${detail}</div>`).join("");
    } 
    catch (error) {
        weatherData.querySelector(".icon").innerHTML = "";
        weatherData.querySelector(".temperature").textContent = "";
        weatherData.querySelector(".description").textContent = "An error happened, please try again later!";

        weatherData.querySelector(".details").innerHTML = "";
        

        
    }
}