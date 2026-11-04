const p = document.querySelector(".p");
const title = document.querySelector(".title");
const apiKey = "87f99f256db5b12acb3db6f9a2ab519a";
const btn = document.getElementById("btn");
const input  = document.getElementById("cityInput");
const weatherContent = document.getElementById("weatherContent");
const Locbtn = document.querySelector(".Locbtn");
const line = document.querySelector(".line");
let sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const notify = document.querySelector(".notify");
let sound = new Audio("sound.wav");
const MainFrame = document.querySelector('.MainFrame');
const weatherDiv = document.querySelector('.weatherDiv')

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
    Country: ${data.sys.country}
    
    `;
    sound.play();
    weatherContent.classList.remove("err");
    line.classList.add("full");
    notify.textContent = `${data.name} Weather Recieved!, Scroll Down`;
        notify.classList.add("active");
    await sleep(3000);
    line.classList.remove("full");
    notify.classList.remove("active");

    }
   


    catch(err){
        title.textContent = "Error"
        const cod = data.cod;
        const msg = data.message;
        const mainMSG = msg.toUpperCase();
        weatherContent.textContent = `${mainMSG}, error code: ${cod}`;
        line.classList.add("err");
                weatherContent.classList.add("err");
                notify.textContent = 'Error';
                notify.classList.add("err");
                await sleep(3000);
                line.classList.remove("err");
                                notify.classList.remove("err");

  
    };
    
};

Locbtn.onclick = async() => {
    
        if (!navigator.geolocation){
            title.textContent = "Error"
            weatherContent.textContent = "Navigation not supported by your device or browser"
            weatherContent.classList.add("err");
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
            Country: ${data.sys.country}  `;
            

                line.classList.add("full");
                sound.play();
                weatherContent.classList.remove("err");
                notify.textContent = `${data.name} Weather Recieved!, Scroll Down`;
        notify.classList.add("active");
                await sleep(3000);
                line.classList.remove("full");
                notify.classList.remove("active");
                notify.classList.remove("err");


            }
            catch(err){

                title.textContent = "Error";
                weatherContent.textContent = "Something went wrong, please check your internet connection"
                line.classList.add("err");
                notify.textContent = 'Error';
                notify.classList.add("err");
                            weatherContent.classList.add("err");
                await sleep(3000);
                line.classList.remove("err");
                notify.classList.remove("err");
            }
           
        }, async (error) => {
            title.textContent = "Error";
            weatherContent.textContent = "Location Permission Denied, Allow your location and try again."
            line.classList.add("err");
            weatherContent.classList.add("err");
            notify.textContent = 'Error';
                notify.classList.add("err");
                await sleep(3000);
                notify.classList.remove("err");
                line.classList.remove("err");
        });
    
}


weatherDiv.addEventListener('mousemove', (e) =>{

    const rect = weatherDiv.getBoundingClientRect();
    
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const xx = (x / 100);
    const yy = (-y / 100);

    weatherDiv.style.transition = "0.1s";
    weatherDiv.style.transform = `perspective(1000px) rotateX(${yy}deg) rotateY(${xx}deg)`;

});

weatherDiv.addEventListener('mouseleave', () =>{

        weatherDiv.style.transition = "0.3s";
        weatherDiv.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-5px)`;


});

MainFrame.addEventListener('mousemove', (e) =>{

    const rect = MainFrame.getBoundingClientRect();
    
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const xx = (x / 100);
    const yy = (-y / 100);

    MainFrame.style.transition = "0.1s";
    MainFrame.style.transform = `perspective(1000px) rotateX(${yy}deg) rotateY(${xx}deg)`;

});


MainFrame.addEventListener('mouseleave', () =>{

        MainFrame.style.transition = "0.3s";
        MainFrame.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-5px)`;


});
