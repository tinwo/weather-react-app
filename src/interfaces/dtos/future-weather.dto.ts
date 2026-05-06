import type {LanguageCode} from "../../types";

export interface FutureWeatherDTO {
    query: string;
    lang?: LanguageCode;
    dt?: Date
}