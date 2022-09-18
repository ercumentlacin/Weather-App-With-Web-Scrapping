import axios from 'axios';

import { WeatherType } from './model/Weather';

function createWeather(data: WeatherType) {
  return `
  <li class="list-group-item">
    <div class="d-flex align-items-center">
      <img src="https://www.havadurumu15gunluk.net${data.imgSrc}" alt="...">
      <div class="d-flex align-items-center ms-2 gap-2">
        <h5 class="m-0">${data.date} ${data.day}</h5>
        <p class="m-0">${data.description}</p>
        <p class="m-0">Sıcaklık: ${data.degrees.morning} - ${data.degrees.night}</p>
      </div>
    </div>
  </li>
  `;
}

function renderLoading(
  buttonElement: HTMLButtonElement,
  weatherContainer: HTMLDivElement
) {
  buttonElement.disabled = true;
  buttonElement.innerHTML = `
    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
    Loading...`;
  weatherContainer.innerHTML = `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;
}

const main = async () => {
  const formContainer = document.querySelector(
    '#form-container'
  ) as HTMLDivElement;
  const formElement = formContainer.querySelector('form');
  const weatherContainer = document.querySelector(
    '#weather-container'
  ) as HTMLDivElement;

  formElement?.addEventListener('submit', async (event) => {
    const buttonElement = formElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    renderLoading(buttonElement, weatherContainer);

    event.preventDefault();
    const cityName = (event.target as HTMLFormElement).city.value as string;
    const { data }: { data: WeatherType[] } = await axios.get(
      `/api/${cityName}`
    );
    buttonElement.disabled = false;
    buttonElement.innerHTML = 'Submit';

    if (['undefined', 'null'].includes(typeof data)) {
      weatherContainer.innerHTML = `
        <div class="alert alert-danger" role="alert">
          Hava durumu bilgisi bulunamadı.
        </div>
      `;
      return;
    }

    data.length > 0 &&
      (weatherContainer.innerHTML = data.map(createWeather).join(''));

    data.length === 0 &&
      (weatherContainer.innerHTML =
        '<div class="alert alert-danger" role="alert">Şehir Bulunamadı</div>');
  });
};

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', main);
}
