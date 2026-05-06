import {useQuery} from "@tanstack/react-query";
import {WeatherService} from "../api";
import type {SearchLocation} from "../interfaces";

export const useSearchWeather = (searchQuery: string) => {
    return useQuery({
        queryKey: ['weather','search', searchQuery],
        queryFn: async (): Promise<SearchLocation[]> => WeatherService.search({ query: searchQuery }),
        enabled: searchQuery.length > 2,
        staleTime: 1000 * 60 * 60,
    });
};