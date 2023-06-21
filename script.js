const apiKey = '1a38558c48284006b71143602232106';

const form = document.getElementById('locationForm');
const input = document.getElementById('locationInput');
const weatherData = document.getElementById('weatherData');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  weatherData.innerHTML = ''
  
  
  const location = input.value.trim();
  if (location !== '') {
    getWeatherData(location);
  }
});



const getWeatherData = (location) =>{
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  axios
    .get(apiUrl)
    .then((response) => {
      const data = response.data;
      const city = data.location.name;
      const country = data.location.country;
      const temperature = data.current.temp_c;
      const condition = data.current.condition.text;

      const html = `
        <h2>${city}, ${country}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Condition: ${condition}</p>
      `;

      weatherData.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
      weatherData.innerHTML = '<p>Error retrieving weather data. Please try again.</p>';
    });
}
