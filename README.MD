# Weather App With Web Scrapping

This application is a simple weather app that uses web scrapping to get the weather data from the website [Hava durumu 15 gunluk](https://www.havadurumu15gunluk.net/).

This application is getting the 15 days weather by city name. The city name is getting from the user input.

The **purpose** of this application is to show how to use web scrapping in a simple way.
Because people are do not have to deal with the API's and they can get the data from the website.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
npm install
npm run api
```

## Usage

Your frontend application will fetch the data from the backend application.

```javascript
const response = await fetch('http://localhost:8080/api/:cityName');
const data = await response.json();
```

or

```javascript
const response = await fetch(
  'https://weather-app-elacin.herokuapp.com/api/:cityName'
);
const data = await response.json();
```

Response data type is an array of objects.

```javascript
const data = [
  {
    date: '2022-09-18',
    day: 'Pazar',
    imgSrc: '/images/imgs/2.jpg',
    description: 'Az Bulutlu',
    degrees: {
      morning: '33°C',
      night: '17°C',
    },
  },
];
```

To use the image, you have to add the image path. For example:

```javascript
<img src="https://www.havadurumu15gunluk.net${data.imgSrc}" alt="...">
```
