import { createWeatherData, fetchCity } from '.';
import * as cheerio from 'cheerio';

describe('createWeatherData', () => {
  test('should be defined', () => {
    expect(createWeatherData).toBeDefined();
  });

  test('should return empty array when lengthOfWeather is zero', () => {
    const weatherContainer: cheerio.Cheerio = cheerio.load('')('');

    const weatherDataList = createWeatherData(weatherContainer);
    expect(weatherDataList).toEqual([]);
  });

  test('should return valid array', () => {
    const $ = cheerio.load(
      `<body>
        <table width="475" cellpadding="0" cellspacing="0" border="0">
          <tbody>
            <tr>
              <td width="75" nowrap="nowrap">2022-09-18</td>
              <td width="70" nowrap="nowrap">Pazar</td>
              <td width="70"><img src="/images/imgs/2.jpg" title="Hava durumu Ankara 15 günlük" width="70" height="48" border="0" alt="Ankara Hava durumu 15 günlük"></td>
              <td width="170"><div align="left"><img src="/havadurumu/images/trans.gif" alt="Ankara Hava durumu 15 günlük" width="1" height="1">Az Bulutlu</div></td>
              <td width="45">&nbsp;&nbsp;33°C</td>
              <td width="45">&nbsp;17°C</td>
            </tr>
          </tbody>
        </table>
      </body>
      `
    );

    const weatherContainer = $('body > table');
    const weatherDataList = createWeatherData(weatherContainer);

    const lengthOfWeather = weatherContainer.children().length;

    expect(lengthOfWeather).toBe(1);
    expect(weatherDataList[0]?.date).toBe('2022-09-18');
  });
});

describe('fetchCity', () => {
  afterEach(() => {
    // reset spy and mock
    jest.restoreAllMocks();
  });

  test('should be defined', () => {
    expect(fetchCity).toBeDefined();
  });

  test('should called with ankara', async () => {
    const mockFetchCity = jest.fn(fetchCity);
    await mockFetchCity('ankara');
    expect(mockFetchCity).toBeCalledWith('ankara');
  });
});
