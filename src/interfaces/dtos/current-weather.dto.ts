import type {LanguageCode} from "../../types";

export interface CurrentWeatherDTO {
    city: string;
    lang?: LanguageCode
}