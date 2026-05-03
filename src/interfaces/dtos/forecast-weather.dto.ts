import type {LanguageCode} from "../../types";

export interface ForecastWeatherDTO {
    query: string;
    days: string[];
    dt?: Date
    unixdt?: number;
    hour?: number;
    lang?: LanguageCode;
    alerts?: string;
    aqi?: string;
    tp?: number;
}