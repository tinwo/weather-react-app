import {WeatherService} from "../api";
import {useQuery} from "@tanstack/react-query";
import {useWeatherParams} from "../context";
import type {LanguageCode} from "../types";

export const useCurrentWeather = () => {
    const { params } = useWeatherParams();
    return useQuery({
        queryKey: ['weather','current', params.query, params.lang],
        queryFn: (): Promise<any> => WeatherService.getCurrentWeather({
            city: params.query,
            lang: params.lang as LanguageCode
        }),
        enabled: !!params.query,
        staleTime: 1000 * 60 * 60 * 10
    });
};