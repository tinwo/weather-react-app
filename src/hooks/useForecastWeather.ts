import {useQuery} from "@tanstack/react-query";
import {useWeatherParams} from "../context";
import {WeatherService} from "../api";
import type {LanguageCode} from "../types";
import type {ForecastWeatherDTO, WeatherForecastResponse} from "../interfaces";

export const useForecastWeather = (options: Partial<ForecastWeatherDTO>) => {
    const { params } = useWeatherParams();
    const defaultDays = 7;

    return useQuery({
        queryKey: ['weather', 'forecast', params.query, params.lang, options.dt],
        queryFn: async(): Promise<WeatherForecastResponse> => WeatherService.getForecast({
            query: params.query,
            lang: params.lang as LanguageCode,
            days: options.days || defaultDays,
            dt: options.dt ,
            ...options
        }),
        enabled: !!params.query,
    });
};