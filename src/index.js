"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const axios_1 = require("axios");
const Weather_1 = require("./model/Weather");
function createWeatherData(weatherContainer) {
    const lengthOfWeather = weatherContainer.children().length;
    const weatherDataList = [];
    for (let index = 0; index < lengthOfWeather; index += 1) {
        const weather = weatherContainer.children().eq(index);
        const weatherData = {
            date: weather.find('td:nth-child(1)').text(),
            day: weather.find('td:nth-child(2)').text(),
            imgSrc: weather.find('td:nth-child(3) > img').attr('src'),
            description: weather.find('td:nth-child(4)').text(),
            degrees: {
                morning: weather.find('td:nth-child(5)').text(),
                night: weather.find('td:nth-child(6)').text(),
            },
        };
        if (weatherData.date.length !== 0) {
            weatherDataList.push(new Weather_1.Weather(weatherData));
        }
    }
    return weatherDataList;
}
async function fetchCity(cityName) {
    try {
        const { data: html } = await axios_1.default.get(`https://www.havadurumu15gunluk.net/havadurumu/${cityName}-hava-durumu-15-gunluk.html`);
        const $ = cheerio_1.default.load(html);
        const weatherContainer = $('body > table:nth-child(4) > tbody > tr:nth-child(3) > td:nth-child(3)');
        const weatherDataList = createWeatherData(weatherContainer);
        return weatherDataList;
    }
    catch (error) {
        console.error(error);
    }
}
console.log(global);
const main = async () => {
    console.log('HELLO WORLD');
    const formContainer = document.querySelector('#form-container');
    const formElement = formContainer.querySelector('form');
    formElement?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const cityName = event.target.city.value;
        await fetchCity(cityName);
    });
};
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', main);
}
