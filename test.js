
const API ='3540e1f84375b794347feb35202ce67e'
let lat, lon;
const ele = document.getElementById('demo');
const weathdes = document.getElementById('weathdes');
const weathicon = document.getElementById('weathicon')
const weathmain = document.getElementById('weathmain');
const temps = document.getElementById('temp')
const tempMax = document.getElementById('tempMax');
const tempMin = document.getElementById('tempmin');
const feel = document.getElementById('tempfeel')
const ws = document.getElementById('ws');
const wd = document.getElementById('wd');
const wg = document.getElementById('wg');
const srise = document.getElementById('srise')
const sset = document.getElementById('sset')
let city = "paris";
const clearsky = "url(./assets/clearsky.jpg)";
const scatteredclouds = "url(./assets/clouds.jpg)";
const rain = "url(./assets/rain.jpg)";
const snow = "url(./assets/snow.jpg)";
const thunderstorm = "url(./assets/thunderstorm.jpg)";
const mist ="url(./assets/mist.jpg)"


document.addEventListener("DOMContentLoaded", function() {
  // Masquer la div demo
  ele.style.display = "none";

  

  // Le reste de votre code...
});





  const sear = document.getElementById('search');
sear.addEventListener("click", () => {
   city = document.getElementById('city').value;


   const url =  `https://api.openweathermap.org/geo/1.0/direct?q=${city}}&appid=${API}`
   
   
   
   
   async function fetchData() {
       try {
        
         const res = await fetch(url);
         const data = await res.json();
     
         console.log(data);
     
         if (data.length > 0) {
           const lat2 = data[0].lat;
           const lon2 = data[0].lon;
           console.log(`Latitude: ${lat2}`);
           console.log(`Longitude: ${lon2}`);
     
           // Convertir lat2 et lon2 en chaînes de caractères
           lat = lat2.toString();
           lon = lon2.toString();
     
           // Appel à la deuxième requête une fois que lat et lon sont définis
           const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`;
           const res2 = await fetch(url2);
           const data2 = await res2.json();
           console.log(data2);
           if(data2) {
             

               const main = data2.weather[0].main
               const icon = data2.weather[0].icon
               const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
               const des = data2.weather[0].description
                const tempN = data2.main.temp;
               const tempM = data2.main.temp_max;
               const tempMi = data2.main.temp_min;
               const tempfe = data2.main.feels_like;
               const windSpend = data2.wind.speed;
               const windGust = data2.wind.gust;
               const windDeg = data2.wind.deg;

               const ssrise = new Date(data2.sys.sunrise *1000 );
               const ssset = new Date(data2.sys.sunset *1000);
               
               console.log(main)
               console.log(icon)

               ele.style.display = "flex";
               weathmain.innerHTML = 
               `<p>${main}</p>
               <img src="${iconUrl}" alt="">
               <p>${des}</p>
               `;
              

               temps.innerHTML=
               `<p>Temperature: ${tempN}°C</p>
               <p>Temperature max: ${tempM}°C</p>
               <p>Temperature min: ${tempMi}°C</p>
               <p>Temperature resentie: ${tempfe}°C</p>
               ` 
              

               ws.innerHTML =
               `<p>wind speed : ${windSpend} :Wind speed. Unit Default: meter/sec </p>
               <p>wind Gust : ${windGust} :Wind gust. Unit Default: meter/sec </p>
                <p>wind deg: ${windDeg}:Wind direction, degrees </p>
                `;
               

               srise.innerHTML = `<p> Heure de lévée: ${ssrise}</p>`
               sset.innerHTML = `<p> heure de coucher : ${ssset}</p>`
               
               if (main ==="Clear"){
                ele.style.backgroundImage = clearsky;
                }else if(main === "Clouds"){
                  ele.style.backgroundImage = scatteredclouds;
                }else if(main === "Rain"){
                  ele.style.backgroundImage = rain;
                  
                }else if(main === "Thunderstorm"){
                  ele.style.backgroundImage = clearsky;
                }else if(main === "Snow"){
                  ele.style.backgroundImage = snow;
                }else if(main === "Mist"){
                  ele.style.backgroundImage = mist;
                }
                
                

           }
         } else {
           console.log("Aucune donnée trouvée dans le tableau.");
         }
       } catch (error) {
         console.error('Erreur dans la chaîne de promesses :', error);
       }
     }
   
     fetchData();


} );






