//myopenweather,,
document.querySelector('.search').addEventListener('submit', async (e)=>{
    e.preventDefault();

    let searched = document.querySelector('#searchInput').value;

    if(searched !== ''){
        clearInfo();
        document.querySelector('.loading').style.display = 'block';

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(searched)}&appid=366d9c1bfece142403102c2e1c1196c7&units=metric&lang=pt-br`;
        
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfo()
            document.querySelector('.error').style.display = 'block';
        }
    }else{
        clearInfo();
    }

});

function showInfo(json){
    document.querySelector('.loading').style.display = 'none';

    document.querySelector('.title').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}, <sup>ºC</sup>`;
    document.querySelector('.windInfo').innerHTML = `${json.windSpeed}`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.windPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.results').style.display = 'block';

}

function clearInfo(){
    document.querySelector('.error').style.display = 'none';
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('.results').style.display = 'none';
}


let currentImage = 2;
/*Change background*/
setInterval(()=>{
    document.querySelector('body').style.backgroundImage = "url('./assets/images/banner"+currentImage+".jpg')";

    if(currentImage >= 5){
        currentImage = 1;
    }else{
        currentImage += 1;
    }

}, 20000);