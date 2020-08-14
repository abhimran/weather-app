const api = {
  key: "9748f034f43ca7ee719ca1339da950d6",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');

searchbox.addEventListener('keypress', function (e) {
  // e.keycode is for enter key
  if (e.keyCode == 13) {
    getResults(searchbox.value);
  }
});

// ===== Function Fetch Api Data
function getResults(cityName) {
  fetch(`${api.base}weather?q=${cityName}&units=metric&appid=${api.key}`)
    .then(weather => weather.json())
    .then(displayResults);
}



// ==== Function Show  Result

function displayResults(weather) {

  // console.log(dayTime(weather.weather[0].icon));
  // Update city name
  let city = document.querySelector('.city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  // Update Date Time
  let now = new Date();
  let date = document.querySelector('.date');
  date.innerText = dateBuilder(now);

  // Update Temp
  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  // Update Weather
  let weather_el = document.querySelector('.weather');
  weather_el.innerText = weather.weather[0].main;

  // Update DayNight
  let dayNight = document.querySelector('.dayNight');
  let check = dayTime(weather.weather[0].icon);
  if (check == true){
    dayNight.innerText = "Day,";
    document.body.style.background = "url('images/day_image.svg') no-repeat center center / cover";

  }else{
    dayNight.innerText = "Night,";
    document.body.style.background = "url('images/night_image.svg') no-repeat center center / cover";
  }
  
  // dayNight.innerText = abc;
  console.log(abc);


  // dayNight.innerText = dayTime(weather.weather[0].icon);

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

}

// === Function Custom Datetime
function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month}, ${year}`;
}

//  FInd Day and night 

const dayTime = (icon) => {
  if(icon.includes('d')){
    return true;
  }else{
    return false;
  }
}