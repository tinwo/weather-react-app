import type {WeatherLocation} from "./weather-locations.model.ts";
import type {WeatherCondition } from './weather-condition.model.ts'

export interface DayForecast {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  condition: WeatherCondition;
  uv: number;
}

export interface HourlyForecast {
  time_epoch: number;
  time: string;
  temp_c: number;
  is_day: number;
  condition: WeatherCondition;
  feelslike_c: number;
  humidity: number;
  chance_of_rain: number;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: DayForecast;
  hour: HourlyForecast[];
}

export interface WeatherForecastResponse {
  location: WeatherLocation;
  condition: WeatherCondition;
  forecast: {
    forecastday: ForecastDay[];
  };
}