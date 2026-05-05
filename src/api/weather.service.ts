import {httpClient} from "../config";
import type {
    CurrentWeatherDTO,
    ForecastWeatherDTO,
    FutureWeatherDTO, SearchLocation,
    SearchWeatherDTO,
    WeatherResponse
} from "../interfaces";
import type {WeatherForecastResponse} from "../interfaces/models/forecaset-weather.model.ts";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class WeatherService {
    // Current
    static async getCurrentWeather(dto: CurrentWeatherDTO): Promise<WeatherResponse> {
        const urlSegment = 'current.json';

        const params = {
            q: dto.city,
            lang: dto?.lang
        };

        await delay(2000);
        const {data} = await httpClient.get<WeatherResponse>(urlSegment, {params});

        return data;
    }

    // Search
    static async search(dto: SearchWeatherDTO): Promise<SearchLocation[]> {
        const urlSegment = 'search.json';
        const params = {
            q: dto.query,
        };
        await delay(2000);
        const {data} = await httpClient.get<SearchLocation[]>(urlSegment, {params});

        return data;
    }

    // Future
    static async getFuture(dto: FutureWeatherDTO): Promise<any> {
        const urlSegment = 'search.json';
        const params = {
            q: dto.query,
            dt: dto?.dt,
            lang:  dto?.lang,
        };

        const {data} = await httpClient.get(urlSegment, {params});

        return data;
    }

    // Forecast
    static async getForecast(dto: ForecastWeatherDTO): Promise<WeatherForecastResponse> {
        const urlSegment = 'forecast.json';
        const params = {
            q: dto.query,
            days: dto.days,
            dt: dto?.dt,
            unixdt: dto?.unixdt,
            hour:  dto?.hour,
            lang:  dto?.lang,
            alerts: dto?.alerts,
            aqi: dto?.aqi,
            tp: dto?.tp
        };

        await delay(2000);
        const {data} = await httpClient.get<WeatherForecastResponse>(urlSegment, {params});

        return data;
    }
}