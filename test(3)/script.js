const p = document.querySelector(".p");
const title = document.querySelector(".title");
const apiKey = "87f99f256db5b12acb3db6f9a2ab519a";
const btn = document.getElementById("btn");
const input  = document.getElementById("cityInput");
const weatherContent = document.getElementById("weatherContent");
const Locbtn = document.querySelector(".Locbtn");

btn.onclick = async function(){

     let placeId = input.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${placeId}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();

    try{
        
    title.textContent = `${data.name} Weather Forecast`
    console.log(data)
    weatherContent.textContent = `
    Tempurature: ${data.main.temp}°C
    Peak Tempurature: ${data.main.temp_max}°C
    Lowest Tempurature: ${data.main.temp_min}°C
    Feels like: ${data.main.feels_like}°C
    Humidity: ${data.main.humidity}%
    Skies: ${data.weather[0].description}
    lattitude: ${data.coord.lat}                 
    longitude: ${data.coord.lon}
    
    `;
    

    }
   

    
    
    
    
    
    
    

    catch(err){
        title.textContent = "Error"
        const cod = data.cod;
        const msg = data.message;
        const mainMSG = msg.toUpperCase();
        weatherContent.textContent = `${mainMSG}, error code: ${cod}`;
  
    };
    
};

Locbtn.onclick = async function(){
    
        if (!navigator.geolocation){
            title.textContent = "Error"
            weatherContent.textContent = "Navigation not supported by your device or browser"
        }

        navigator.geolocation.getCurrentPosition(async (position) => {

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            let response = await fetch(URL);
            let data = await response.json()
            
            try{

            

            title.textContent = `${data.name} Weather Forecast`
            console.log(data)
            weatherContent.textContent = `
            Tempurature: ${data.main.temp}°C
            Peak Tempurature: ${data.main.temp_max}°C
            Lowest Tempurature: ${data.main.temp_min}°C
            Feels like: ${data.main.feels_like}°C
            Humidity: ${data.main.humidity}%
            Skies: ${data.weather[0].description}
            lattitude: ${data.coord.lat}                 
            longitude: ${data.coord.lon}`;


            }
            catch(err){

                title.textContent = "Error";
                weatherContent.textContent = "Something went wrong, please check your internet connection"

            }
           
        }, (error) => {
            title.textContent = "Error";
            weatherContent.textContent = "Location Permission Denied, Allow your location and try again."
        });
    
}