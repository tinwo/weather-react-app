import {useQuery} from "@tanstack/react-query";
import {useWeatherParams} from "../context";
import {WeatherService} from "../api";
import type {LanguageCode} from "../types";
import type {ForecastWeatherDTO} from "../interfaces";

export const useForecastWeather = (options: Partial<ForecastWeatherDTO>) => {
    const { params } = useWeatherParams();
    return useQuery({
        queryKey: ['weather', 'forecast', params.query, params.lang, options.days],
        queryFn: () => WeatherService.getForecast({
            query: params.query,
            lang: params.lang as LanguageCode,
            days: options.days || ['3'], // значення за замовчуванням
            ...options
        }),
        enabled: !!params.query,
    });
};