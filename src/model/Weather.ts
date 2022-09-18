interface Degrees {
  morning: string;
  night: string;
}

export interface WeatherType {
  date: string;
  day: string;
  imgSrc: string;
  description: string;
  degrees: Degrees;
}

export class Weather implements WeatherType {
  public date: string;
  public day: string;
  public imgSrc: string;
  public description: string;
  public degrees: Degrees;

  constructor({ date, day, imgSrc, description, degrees }: WeatherType) {
    this.date = date;
    this.day = day;
    this.imgSrc = imgSrc;
    this.description = description;
    this.degrees = degrees;
  }
}
