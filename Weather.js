// Create stars dynamically
const starsContainer = document.querySelector('.stars');
for(let i = 0; i < 100; i++){
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random()*100 + '%';
    star.style.top = Math.random()*100 + '%';
    star.style.animationDelay = Math.random()*3 + 's';
    starsContainer.appendChild(star);
}

// Weather API
const apikey = "1ecd47455ab15d85cc5c2950f558b7be";
const apiURl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search-wrapper input");
const searchbtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon-large");

async function checkweather(city){
    try{
        const response = await fetch(apiURl + city + `&appid=${apikey}`);
        if(!response.ok){
            alert("City not found. Please enter a valid city name.");
            return;
        }
        const data = await response.json();
        updateUI(data);
    } catch(error){
        alert("Error fetching data. Please check your internet connection.");
    }
}

function updateUI(data){
    document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const main = data.weather[0].main;
    if(main=="Clouds") weatherIcon.src = "images/clouds.png";
    else if(main=="Clear") weatherIcon.src = "images/clear.png";
    else if(main=="Rain") weatherIcon.src = "images/rain.png";
    else if(main=="Drizzle") weatherIcon.src = "images/drizzle.png";
    else if(main=="Mist") weatherIcon.src = "images/mist.png";
    else weatherIcon.src = "images/clear.png";
}

// ✅ CLICK SEARCH
searchbtn.addEventListener("click", ()=>{
    const city = searchbox.value.trim();
    if(city) checkweather(city);
});

// ✅ ENTER KEY SEARCH
searchbox.addEventListener("keydown", (event)=>{
    if(event.key === "Enter"){
        const city = searchbox.value.trim();
        if(city) checkweather(city);
    }
});
