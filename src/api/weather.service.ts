import {httpClient} from "../config";
import type {CurrentWeatherDTO, ForecastWeatherDTO, FutureWeatherDTO, SearchWeatherDTO} from "../interfaces";

export class WeatherService {
    // Current
    static async getCurrentWeather(dto: CurrentWeatherDTO): Promise<any> {

        const url = 'current.json';
        const params = {
            q: dto.city,
            land: dto?.lang
        };

        const {data} = await httpClient.get(url, {params});

        return data;
    }

    // Search
    static async search(dto: SearchWeatherDTO): Promise<any> {
        const url = 'search.json';
        const params = {
            q: dto.query,
        };

        const {data} = await httpClient.get(url, {params});

        return data;
    }

    // Future
    static async getFuture(dto: FutureWeatherDTO): Promise<any> {
        const url = 'search.json';
        const params = {
            q: dto.query,
            dt: dto?.dt,
            lang:  dto?.lang,
        };

        const {data} = await httpClient.get(url, {params});

        return data;
    }

    // Forecast
    static async getForecast(dto: ForecastWeatherDTO): Promise<any> {
        const url = 'forecast.json';
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

        const {data} = await httpClient.get(url, {params});

        return data;
    }
}