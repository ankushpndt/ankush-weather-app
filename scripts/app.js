const cityFrom = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time =document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) =>{
    //destructuring
    const {cityDets, weather} = data;

    //updating details template
    details.innerHTML=`
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-3">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
      `;
    //update the day/night and icons images
    let iconSrc=`img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);



    let timeSrc=null;
    if(weather.IsDayTime){
        timeSrc='img/day.svg'
    } 
    else{
        timeSrc='img/night.svg'
    }
    time.setAttribute('src',timeSrc);

    //remove the d-none class

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none'); 
    }
};
 

const updateCity= async(city)=>{
   const cityDets = await getCity(city);
   const weather = await getWeather(cityDets.Key);
   return {cityDets,weather};
};

cityFrom.addEventListener('submit', (e)=>{
    //prevent default action
    e.preventDefault();

    // get city value
    const city= cityFrom.city.value.trim();
    cityFrom.reset();
    //update the UI with new city name
    updateCity(city).then((data)=>updateUI(data));

});