import {createContext, useContext, useState} from "react";
import * as React from "react";

interface WeatherState {
  query: string;
  lang: string;
}

interface WeatherContextType {
  params: WeatherState;

  setCity: (city: string) => void;
  setLang: (lang: string) => void;

  resetToCurrent: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({children}: { children: React.ReactNode }) => {
  const DEFAULT_CITY = 'Kyiv';
  const DEFAULT_LANGUAGE = 'uk';

  const [params, setParams] = useState<WeatherState>({
    query: DEFAULT_CITY,
    lang: DEFAULT_LANGUAGE,
  });


  const resetToCurrent = () => setParams({
    query: DEFAULT_CITY,
    lang: DEFAULT_LANGUAGE
  });

  const setCity = (query: string) => setParams(prev => ({...prev, query}));
  const setLang = (lang: string) => setParams(prev => ({...prev, lang}));


  return (
      <WeatherContext.Provider
          value={{params, setCity, setLang, resetToCurrent}}>
        {children}
      </WeatherContext.Provider>
  );
};

export const useWeatherParams = (): WeatherContextType => {
  const context: WeatherContextType | undefined = useContext(WeatherContext);
  if (!context) throw new Error('useWeatherParams must be used within WeatherProvider');
  return context;
};