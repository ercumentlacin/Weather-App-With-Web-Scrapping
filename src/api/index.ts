import axios from 'axios';
import * as cheerio from 'cheerio';

import { Weather, WeatherType } from '../model/Weather';

function createWeatherData(weatherContainer: cheerio.Cheerio) {
  const lengthOfWeather = weatherContainer.children().length;
  const weatherDataList: WeatherType[] = [];

  for (let index = 0; index < lengthOfWeather; index += 1) {
    const weather = weatherContainer.children().eq(index);
    const weatherData: WeatherType = {
      date: weather.find('td:nth-child(1)').text(),
      day: weather.find('td:nth-child(2)').text(),
      imgSrc: weather.find('td:nth-child(3) > img').attr('src') as string,
      description: weather.find('td:nth-child(4)').text(),
      degrees: {
        morning: weather.find('td:nth-child(5)').text().trim(),
        night: weather.find('td:nth-child(6)').text().trim(),
      },
    };
    if (weatherData.date.length !== 0) {
      weatherDataList.push(new Weather(weatherData));
    }
  }
  return weatherDataList;
}

export async function fetchCity(cityName: string) {
  try {
    const { data: html } = await axios.get(
      `https://www.havadurumu15gunluk.net/havadurumu/${cityName}-hava-durumu-15-gunluk.html`
    );
    const $ = cheerio.load(html);

    const weatherContainer = $(
      'body > table:nth-child(4) > tbody > tr:nth-child(3) > td:nth-child(3)'
    );
    const weatherDataList: WeatherType[] = createWeatherData(weatherContainer);

    return weatherDataList;
  } catch (error) {
    console.error(error);
  }
}
