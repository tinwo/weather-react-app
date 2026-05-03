import {useWeatherParams} from "../context";
import {useQuery} from "@tanstack/react-query";
import {WeatherService} from "../api";
import type {LanguageCode} from "../types";

export const useFutureWeather = (date: Date) => {
    const { params } = useWeatherParams();
    return useQuery({
        queryKey: ['weather','future', params.query, date.toISOString()],
        queryFn: () => WeatherService.getFuture({
            query: params.query,
            dt: date,
            lang: params.lang as LanguageCode
        }),
        enabled: !!params.query && !!date,
    });
};