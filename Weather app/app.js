// function GetDates(startDate, daysToAdd) {
//     var aryDates = [];

//     for (var i = 0; i <= daysToAdd; i++) {
//         var currentDate = new Date();
//         currentDate.setDate(startDate.getDate() + i);
//         aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear());
//     }
//    console.log(aryDates)
//     return aryDates;
// }

// function MonthAsString(monthIndex) {
//     var d = new Date();
//     var month = new Array();
//     month[0] = "January";
//     month[1] = "February";
//     month[2] = "March";
//     month[3] = "April";
//     month[4] = "May";
//     month[5] = "June";
//     month[6] = "July";
//     month[7] = "August";
//     month[8] = "September";
//     month[9] = "October";
//     month[10] = "November";
//     month[11] = "December";

//     return month[monthIndex];
// }

// function DayAsString(dayIndex) {
//     var weekdays = new Array(7);
//     weekdays[0] = "Sunday";
//     weekdays[1] = "Monday";
//     weekdays[2] = "Tuesday";
//     weekdays[3] = "Wednesday";
//     weekdays[4] = "Thursday";
//     weekdays[5] = "Friday";
//     weekdays[6] = "Saturday";

//     return weekdays[dayIndex];
// }

// let startDate = new Date();
// let aryDates = GetDates(startDate, 7);
// console.log(aryDates);​





let key_api = "ea0cf76ef4795baacfff461fc95ac465";

fetch(`https://api.openweathermap.org/data/2.5/group?id=3186886,12217089,2643743,3191281,2988507,2761369,2950159,&units=metric&appid=${key_api}`)
    .then(response => response.json())
    .then(data => {

        let weatherData = data.list[0]
        let cityNameFirst = weatherData.name;
        let dataWeatherFirst = weatherData.main.temp
        let iconData = weatherData.weather[0].icon

        let icon = `<img id="img_" src="https://openweathermap.org/img/wn//${iconData}@4x.png" alt="weather icon" class="w-icon">`
        document.querySelector("#weatherLondon").innerHTML = `${cityNameFirst} ${dataWeatherFirst}°C ${icon}`
        let weatherDataList = data.list

        weatherDataList.forEach((e) => {
            let mask = document.querySelector(".mask");
            let name = e.name
            let temp = e.main.temp
            let icon = e.weather[0].icon
            mask.innerHTML += `
            <span>${name} ${temp}°C <img id="img_" src="https://openweathermap.org/img/wn//${icon}@4x.png" alt="weather icon" class="w-icon"> </span> `

        })
    })








/* weather living */
setInterval(function () {
    let show = document.querySelector('span[data-show]');
    let next = show.nextElementSibling || document.querySelector("span:first-child");
    let up = document.querySelector("span[data-up]")

    if (up) {
        up.removeAttribute("data-up")
    }
    show.removeAttribute("data-show")
    show.setAttribute("data-up", "")
    next.setAttribute("data-show", "")
}, 2000)






//   let key = "08d136eb9dd94b3fb75b5bd7cb0d016c";

//   fetch(`https://api.weatherbit.io/v2.0/current/airquality?lat=51.5073219&lon=-0.1276474&key=${key}`)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })



// Time day
const apiKey = "ea0cf76ef4795baacfff461fc95ac465";
const submitBtn = document.querySelector(".btn_");
submitBtn.addEventListener("click", () => {
    // let seeMoreBtn = document.querySelector("#see-more-btn");
    // seeMoreBtn.style.display = 'flex';
    // let seeMoreBtne = document.querySelector("#see-more-btne");
    // seeMoreBtne.style.display = 'flex';

    // let input = inputBtn.toLowerCase();
    let inputBtn = document.querySelector("#inputValue").value;
    ///////////////////////// //geolaocation /////////////////////////////////
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputBtn}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            /////////////////////////////////weather/////////////////////////////////
            let lat = data[0].lat;
            let lon = data[0].lon;
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    showWeatherData(data)
                    WeatherSevenDay(data)
                })
        })
})
function showWeatherData(data) {

    let icon = data.current.weather[0].icon;
    let timeZon = data.timezone;
    timeZon.split('/')[0];
    console.log(timeZon)
    let temp = data.current.temp
    let humidity = data.current.humidity
    let description = data.current.weather[0].description
    let wind_speed = data.current.wind_speed
    let pressure = data.current.pressure
    let feels_like = data.current.feels_like
    let dew_point = data.current.dew_point


    document.querySelector(".city").innerText = "Weather in " + timeZon;
    document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";

    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
        "Wind speed: " + wind_speed + " km/h";
    document.querySelector(".pressure").innerText = "Pressure:" + pressure;
    document.querySelector(".home").style.backgroundImage =
        "url('https://source.unsplash.com/1200x700/?" + timeZon + "')";
    document.querySelector(".feelLike").innerText = "Feel Like:" + feels_like + "°C";
    document.querySelector(".dewPoint").innerText = "Dew Point:" + dew_point;



    document.querySelector(".weather").classList.remove("loading");

    document.querySelector("#city_1").innerText = timeZon

}



// Sevent day

let btn_seven = document.querySelector(".btn_seven").addEventListener("click", WeatherSevenDay)

function WeatherSevenDay() {
    let apiKey = "ea0cf76ef4795baacfff461fc95ac465";
    let valueSeven = document.querySelector("#valueSeven").value
    ///////////////////////// //geolaocation /////////////////////////////////
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${valueSeven}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            /////////////////////////////////weather/////////////////////////////////
            let lat = data[0].lat;
            let lon = data[0].lon;
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    inhtmlSevenDay(data)
                    document.querySelector(".weather__").style.display = "none"
                    document.querySelector(".future-forecast").style.display = "flex"

                })
        })
}

let otherDayForcast = '';
let currentTemp = ''
function inhtmlSevenDay(data) {
    let weatherForecastEl = document.getElementById('weather-forecastt')
    console.log(weatherForecastEl)
    let currentTempEl = document.getElementById('current-temp');


    let days = [];
    let daysRequired = 7
    
    for (let i = 1; i <= daysRequired; i++) {
      days.push( moment().add(i, 'days').format('dddd, Do MMMM YYYY') )
    }
    

    


    data.daily.forEach((day, idx) => {
        console.log(day)
        if (idx == 0) {
            console.log(idx)
            currentTemp +=
                `
                  <div class="day">Monday</div>
                  <img src="https://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
                  <div class="other">
                  <div class="temp">Night - ${day.temp.night}&#176;C</div>
                  <div class="temp">Day - ${day.temp.day}&#176;C</div>
                  </div>
                  </div>
                  `
        }
        else {

            otherDayForcast += `
                <div data-aos="fade-down-left" class="weather-forecast-item">
                <div class="day"></div>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Morning - ${day.temp.morn}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Max - ${day.temp.min}&#176;C</div>
                <div class="temp">Min - ${day.temp.max}&#176;C</div>
                </div>
                
                `
        }
    })




    currentTempEl.innerHTML = currentTemp

    weatherForecastEl.innerHTML = otherDayForcast;

}





//   weather table 16 day


let btn_fourDay = document.querySelector(".btn_foruDay");
btn_fourDay.addEventListener("click", fourDayandThreHour);
function fourDayandThreHour() {
    let DayValue = document.querySelector("#foruDay").value

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '99a41d1327msh0a395a140e241e3p1f6e14jsnebb71e480506',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
    };

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${DayValue}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            /////////////////////////////////weather/////////////////////////////////
            let lat = data[0].lat;
            let lon = data[0].lon;

            fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat=${lat}&lon=${lon}`, options)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    weather16day(data)
                })
                .catch(err =>
                    console.log(err)
                );


        })
}



function weather16day(data) {
    let weatherForecast16Day = document.getElementById('weather16day')

    data.data.forEach((day, idx) => {
        let iconWeather = day.weather.icon
        let icon = iconWeather.substring(1);
        // let icon = `<img src="https://openweathermap.org/img/wn//${iconWeather}@4x.png" alt="weather icon" class="w-icon">`

        weatherForecast16Day.innerHTML +=
            `
                          <tr  style="line-height:2.2;font-size: 1.4rem; class="active">
                              <td>${day.valid_date} <img id="img_" src="https://openweathermap.org/img/wn//${icon}@4x.png" alt="weather icon" class="w-icon"></td>
                              <td>${day.temp}°c</td>
                              <td>${day.app_max_temp}°c</td>
                              <td>${day.app_min_temp}°c</td>
                              <td>${day.clouds}</td>
                              <td>${day.ozone}</td>
                              <td>${day.uv}</td>
                          </tr>
                `
      

        // if(day.temp > 30 && day.temp < 40 ) {
        //     document.querySelector("#tempColor").style.color = "#FF8100"
        // }
        //  if (day.temp < 30 && day.temp > 20){
        //     document.querySelector("#tempColor").style.color = "#F5CE62"
        // }
        //  if (day.temp < 20 && day.temp > 13){
        //     document.querySelector("#tempColor").style.color = "#DFE7FF"
        // }
        // else {
        //     document.querySelector("#tempColor").style.color = "#A1BFFF"
        // }
    })
}

// inputSearchTable
function searchTable() {
    // Declare variables
    let input, filter, table, tr, td, i, txtValue;
    input = document.querySelector("#myInput");
    filter = input.value.toUpperCase();
    table = document.querySelector(".table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}




// Air quality map



let o3V = document.querySelector('.air-parameters .o3')
let coV = document.querySelector('.air-parameters .co')
let so2V = document.querySelector('.air-parameters .s02')
let no2V = document.querySelector('.air-parameters .n02')
let pm10V = document.querySelector('.air-parameters .pm10')
let pm25V = document.querySelector('.air-parameters .pm25')

let o3T = document.querySelector('.last-update .o3-time')
let coT = document.querySelector('.last-update .co-time')
let so2T = document.querySelector('.last-update .s02-time')
let no2T = document.querySelector('.last-update .n02-time')
let pm10T = document.querySelector('.last-update .pm10-time')
let pm25T = document.querySelector('.last-update .pm25-time')



var mapOptions = {
    center: [51.5, -0.1],
    zoom: 5
}


let map = new L.map('map', mapOptions);


var layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);


map.addLayer(layer);



map.on('click', function (e) {
    map.setView([e.latlng.lat, e.latlng.lng], 9);

    var coord = e.latlng;
    var lat = coord.lat;
    var lng = coord.lng;
    console.log(lat, lng)
})




const clickBtn = document.querySelector(".btn_airQuality")
clickBtn.addEventListener('click', setQuery);


function setQuery() {

    let search = document.querySelector('#airQuality').value;
    let keyMap = "ea0cf76ef4795baacfff461fc95ac465";

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${keyMap}`)
        .then(respons => respons.json())
        .then(data => {
            console.log(data)
            /////////////////////////////////weather/////////////////////////////////
            let lat = data[0].lat;
            let lon = data[0].lon;
            console.log(lat)
            console.log(lon)
            document.getElementById('lat-value').innerText = `${lat}`;
            document.getElementById('lon-value').innerText = `${lon}`;
            let city_name = data[0].name;
            let state = data[0].state
            // console.log(city)
            // document.querySelector('#city_Location').innerHTML = city;
            document.querySelector(".location .date").innerText = state;
            document.querySelector('.location .city').innerText = city_name;

            getResults(lat, lon)

       
        })
}       



function getResults(lat, lon) {
    try {
        let keyyy = "ea0cf76ef4795baacfff461fc95ac465"
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${keyyy}`)
            .then(response => response.json())
            .then(data => {
                map.setView([lat, lon], 9);
                displayResults_aq(data)
           
                let data_ = data.list[0].components

                // let locCity = data.city_name;
                let aqi = data.list[0].main
                let pm10 = data_.pm10
                let pm25 = data_.pm2_5.toFixed(2)
                // let moldLevel = data.data[0].mold_level;
                let o3 = data_.o3;
                let so2 = data_.so2;
              

                let good = L.circle([lat, lon], 15000, { color: '#45e50d', opacity: 1, fillColor: '#45e50d', fillOpacity: .4 })
                let moderat = L.circle([lat, lon], 15000, { color: '#ffde33', opacity: 1, fillColor: '#ffde33', fillOpacity: .4 })
                let sensitive = L.circle([lat, lon], 15000, { color: '#ee8310', opacity: 1, fillColor: '#ee8310', fillOpacity: .4 })
                let unhealthy = L.circle([lat, lon], 15000, { color: '#fe0000', opacity: 1, fillColor: '#fe0000', fillOpacity: .4 })
                    .addTo(map)
                    .bindPopup(`
      <!-- Modal body -->
      <div class="modal-body">
 
          <table class="table table-striped">
    <thead>
      <tr>
        <th>AQI</th>
        <th>PM10</th>
        <th>PM25</th> 
      </tr>
    </thead>

    <tbody>
    <tr>
    <td>${aqi}</td>
    <td>${pm10}</td>
    <td>${pm25}</td>
    </tr>

    <tr>
    <th>Mold Level</th>
    <th>o3</th>
    <th>SO2</th>
    </tr>
      <tr>
        <td>#</td>
        <td>${o3}</td>
        <td>${so2}</td>
      </tr>
    </tbody>
  </table>
  </div>`)
                    .openPopup(onclick)
                    .addTo(map)

                if (pm25 <= 12) {
                    good.addTo(map)
                    let airQuality = document.querySelector("#quality").innerText = " Good";
                    let parameters = document.querySelector(".parameters").style.color = "#45e50d";
                    let modalBackground = document.querySelector(".leaflet-popup-content-wrapper, .leaflet-popup-tip").style.backgroundColor = "#45e50d";
                }
                if (pm25 >= 12.1 && pm25 <= 35.4) {
                    moderat.addTo(map)
                    let airQuality = document.querySelector("#quality").innerText = " Moderat";
                    let parameters = document.querySelector(".parameters").style.color = "#ffde33";
                    let modalBackground = document.querySelector(".leaflet-popup-content-wrapper, .leaflet-popup-tip").style.backgroundColor = "#ffde33";

                }
                if (pm25 >= 35.6 && pm25 <= 55.4) {
                    sensitive.addTo(map)
                    let airQuality = document.querySelector("#quality").innerText = " Sensitive";
                    let parameters = document.querySelector(".parameters").style.color = "#ee8310";
                    let modalBackground = document.querySelector(".leaflet-popup-content-wrapper, .leaflet-popup-tip").style.backgroundColor = "#ee8310";

                }
                if (pm25 >= 50.5 && pm25 <= 150.4) {
                    unhealthy.addTo(map)
                    let airQuality = document.querySelector("#quality").innerText = " Unhealthy"
                    let parameters = document.querySelector(".parameters").style.color = "#fe0000";
                    let modalBackground = document.querySelector(".leaflet-popup-content-wrapper, .leaflet-popup-tip").style.backgroundColor = "#fe0000";

                }

            })
    }
    catch {
        alert('City Not Found')
    }
}


//map in air quality


function displayResults_aq(data) {
    console.log(data)
    let data_ = data.list[0].components

    let o3 = data_.o3;
    let co = data_.co;
    let so2 = data_.so2;
    let no2 = data_.no2;
    let pm10 = data_.pm10;
    let pm25 = data_.pm2_5;
    document.querySelector('.parameters-options .o3-value').innerText = o3 + "µg/m³";
    document.querySelector('.parameters-options .co-value').innerText = co + "µg/m³";
    document.querySelector('.parameters-options .so2-value').innerText = so2 + "µg/m³";
    document.querySelector('.parameters-options .no2-value').innerText = no2 + "µg/m³";
    document.querySelector('.parameters-options .pm10-value').innerText = pm10 + "µg/m³";
    document.querySelector('.parameters-options .pm25-value').innerText = pm25 + "µg/m³";

    o3V.innerText = `${o3}`;
    coV.innerText = `${co}`;
    so2V.innerText = `${so2}`;
    no2V.innerText = `${no2}`;
    pm10V.innerText = `${pm10}`;
    pm25V.innerText = `${pm25}`;

    o3T.innerText = `${o3}`;
    coT.innerText = `${co}`;
    so2T.innerText = `${so2}`;
    no2T.innerText = `${no2}`;
    pm10T.innerText = `${pm10}`;
    pm25T.innerText = `${pm25}`;
    

    // let cityName = data.city_name
    // let location = data.data[0].city_name

  
    // let airStat = "", color = ""

    //     	if (aqi > 30 && aqi < 40) {
    //     		{airStat = "Good"
    //             color = "rgb(19, 201, 28)"

    //         }
    //           if (aqi < 30 && aqi > 20) {
    //             airStat = "Fair"
    //             color = "rgb(15, 134, 25)"
    //          }
    //     	if (aqi > 40){
    //             airStat = "Moderate"
    //     		color = "rgb(201, 204, 13)"
    //         }
    //     	else  {
    //     		airStat = "Poor"
    //     	    color = "rgb(204, 83, 13)"
    //         }

    //     	airQuality.innerText = airStat
    //     	airQuality.style.color = color
    //     }
}


function dateBuilder(d) {
    let months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December",
    ];
    let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    console.log(day,date,month,year)

    return `${day} ${date} ${month} ${year}`;
} 


