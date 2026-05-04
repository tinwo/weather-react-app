import {httpClient} from "../config";
import type {CurrentWeatherDTO, ForecastWeatherDTO, FutureWeatherDTO, SearchWeatherDTO} from "../interfaces";

export class WeatherService {
    // Current
    static async getCurrentWeather(dto: CurrentWeatherDTO): Promise<any> {
        const urlSegment = 'current.json';
        const params = {
            q: dto.city,
            land: dto?.lang
        };

        const {data} = await httpClient.get(urlSegment, {params});

        return data;
    }

    // Search
    static async search(dto: SearchWeatherDTO): Promise<any> {
        const urlSegment = 'search.json';
        const params = {
            q: dto.query,
        };

        const {data} = await httpClient.get(urlSegment, {params});

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
    static async getForecast(dto: ForecastWeatherDTO): Promise<any> {
        const urlSegment = 'forecast.json';
        console.log('forecaset dto', dto);
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

        const {data} = await httpClient.get(urlSegment, {params});

        return data;
    }
}