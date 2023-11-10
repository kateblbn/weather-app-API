const btn = document.querySelector('.btn');
const searchInfo = document.querySelector('.search__info');
const weather = document.querySelector('.weather');


btn.addEventListener('click', show)
function show() {
      let value = searchInfo.value;
      let x =  value ? value : "Oslo"; 
      console.log(x);
      getData(x);
}
//вызов функции в которую нужно передать параметром.
show()
function getData(x) {
      const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${x}&appid=d8ca3dee9cfd841abd4b1935d6985b69`;
      fetch(urlApi)
      .then(response => response.json())
      .then(json => app(json)  )
}
//вызов функции с помощью другой фенкции

      function app(json) { 
      
      console.log(json);
      let cels = Math.round(json.main.temp - 273.15);
      let cels_min = Math.round(json.main.temp_min - 273.15);
      let cels_max = Math.round(json.main.temp_max - 273.15);
      let direc = json.wind.deg;
      let direction = direc == 0 ? "N" : 
      direc < 90 ? "NE" : direc < 180 ? "SE" : direc == 180 ? "S" : direc < 270 ? "SW" : direc == 270 ? "W" : direc <= 360 ? "NW" : "none";
      let visColor = json.visibility < 200 ? "black" : json.visibility == 200 ? "blue" : json.visibility < 350 ? "red" : json.visibility  < 630 ? "yellow" : json.visibility < 1200 ? "white" : json.visibility >= 1200 ? "green" : "none";

     let template = `
      <div class="wrapper">
            <div class="background"></div>
            <div class="weather__location">
                <i class="fa-solid fa-location-dot"></i>
                <span class="location">${json.name}</span>
            </div>
            <div class="weather__img">
                <img src="../img/${json.weather[0].icon}.png" alt="${json.weather[0].main}" class="icons">
                <span class="descr-img">${json.weather[0].description}</span>
            </div>
            <div class="weather__temp">
                <span class="temp">${cels}</span>
                <div class="celsius">℃</div>
            </div>
            <div class="weather__temp-max-min">
                <span class="min">${cels_min}</span>℃
                <div class="between">/</div>
                <span class="max">${cels_max}</span>℃
            </div>    
      </div>
      <div class="footer">
            <div class="weather__visib one-line">
            <p>visibility: </p>
            <span class="visib ml5 ${visColor}">${json.visibility}</span>
            </div>
            <div class="one">
                  <div class="weather__humidity one-line">
                  <p>humidity, %: </p>
                  <span class="humidity ml5">${json.main.humidity}</span>
                  </div>
                  <div class="weather__pressure one-line">
                  <p>pressure, inHg: </p>
                  <span class="pressure ml5">${json.main.pressure}</span>
                  </div>
            </div>
            <div class="one">
                  <div class="weather__wind one-line">
                  <p>wind speed, mph: </p>
                  <span class="wind"> ${json.wind.speed}</span>
                  </div>
                  <div class="weather__direct one-line">
                  <p>direction: ${direction}</p>
                  <span class="direct"></span>
                  </div>
            </div>
      </div>
      `
weather.innerHTML = template;

}

