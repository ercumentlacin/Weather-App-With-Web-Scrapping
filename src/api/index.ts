import express, { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

import path from 'path';

import { Weather, WeatherType } from '../model/Weather';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../dist')));

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

async function fetchCity(cityName: string) {
  try {
    const { data: html } = await axios.get(
      `https://www.havadurumu15gunluk.net/havadurumu/${cityName}-hava-durumu-15-gunluk.html`,
      {
        headers: {
          //  fix cors error
        },
      }
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

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../dist'));
});

app.get('/api/:cityName', async (req: Request, res: Response) => {
  const cityName = req.params.cityName;
  const weatherDataList = await fetchCity(cityName);
  res.status(200).json(weatherDataList);
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
