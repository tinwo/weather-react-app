import type {LanguageCode} from "../../types";

export interface ForecastWeatherDTO {
    query: string;
    days: number;
    dt?: string
    unixdt?: number;
    hour?: number;
    lang?: string;
    alerts?: string;
    aqi?: string;
    tp?: number;
}