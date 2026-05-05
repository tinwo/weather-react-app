import { useCurrentWeather, useForecastWeather } from "../../hooks";
import Modal from "../Modal/Modal.tsx";
import { useState } from "react";
import { useWeatherParams } from "../../context";
import HourlyForecast from "../HourlyForecast/HourlyForecast.tsx";
import HistoryList from "../HistoryList/HistoryList.tsx";
import LanguageSelect from "../LanguageSelect/LanguageSelect.tsx";


const citiesTemplates: string[] = [
  'Kyiv', 'Berlin', 'London', 'Tokio', 'Moscow', 'Paris',
];

export const WeatherDashboard = () => {
  const { params, setCity, setLang, } = useWeatherParams();
  const current = useCurrentWeather();
  const [days, setDays] = useState(new Date());
  const [langValue, setLangValue] = useState('uk')

  const forecast = useForecastWeather({ query: params.query, lang: params.lang });
  const [modalStatus, setModalStatus] = useState<boolean>(false);


  const [loading, setLoading] = useState(false);

  const onModalHandler = (): void => {
    setModalStatus(true);
  }

  const weatherTemplateHandler = (city: string): void => {
    setCity(city);
  }

  return (


    <>

      <div className="min-h-screen bg-[#f8f9fa] text-[#202124] font-sans p-4 md:p-8">
        {/* Header */}

        <header className="max-w-4xl mx-auto mb-8 ">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-light text-[#5f6368] text-center sm:text-left tracking-tight">
              Weather<span className="text-blue-500 font-medium">.</span>
            </h1>

            <div className='flex justify-between align-middle gap-6'>
              <LanguageSelect value={langValue} onChange={setLangValue}></LanguageSelect>

              <button
                  onClick={onModalHandler}
                  className="flex-1 text-nowrap bg-gray-800 hover:bg-blue-700 text-white px-8 py-2 rounded-full font-medium  transition-all active:scale-95"
              >
                Пошук
              </button>
            </div>
          </div>

        </header>

        <main className="max-w-4xl mx-auto space-y-6">
          {/* City Templates Section */}
          <section className=" rounded-3xl  border-gray-100">
            {/*<h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4">Templates</h3>*/}
            <div className="flex flex-wrap gap-2">
              {citiesTemplates.map((city: string, index: number) => (
                <button
                  key={city + index}
                  onClick={() => weatherTemplateHandler(city)}
                  className="px-4 py-2 rounded-full bg-gray-200 hover:bg-blue-100 hover:cursor-pointer hover:text-blue-600 transition-colors text-sm font-medium"
                >
                  {city}
                </button>
              ))}
            </div>
          </section>

          {/* History Section */}
          {/*<section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">*/}
          {/*  <HistoryList />*/}
          {/*</section>*/}

          {/* Main Weather Display */}
          <div className="space-y-6">
            {current.isLoading && (
              <div className="flex justify-center p-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            {current.isError && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm">
                {current.error instanceof Error && current.error.message}
              </div>
            )}

            {/* Current Weather Card */}

            <h2 className='text-3xl font-bold mb-4'>Поточна погода</h2>
            <section
              className="relative overflow-hidden bg-white rounded-[2.5rem] p-8 md:p-12  group transition-all ">


              <div
                className="  " />

              <div className="">
                {/* Верхня частина: Місто та Температура */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-10">

                  {/* Ліва частина: Локація */}
                  <div className="space-y-2 text-center md:text-left">

                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-gray-900 leading-tight">
                      {current.data?.location?.name}
                    </h1>

                    <p className="text-xl md:text-2xl font-medium text-gray-400 flex items-center justify-center md:justify-start gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {current.data?.location?.country}
                    </p>
                  </div>

                  {/* Права частина: Велика температура та іконка */}
                  <div className="flex flex-col items-center md:items-end">
                    <div className="flex items-center gap-4 mb-2">
                      <img
                        src={current.data?.current.condition.icon}
                        alt={current.data?.current.condition.text}
                        className="w-16 h-16 object-contain"
                      />
                      <div className="flex items-start">
                        <span
                          className="text-8xl md:text-9xl font-light tracking-tighter text-blue-600 leading-none">
                          {current.data?.current.temp_c}
                        </span>
                        <span className="text-4xl md:text-5xl font-light text-blue-400 mt-2">°</span>
                      </div>
                    </div>

                    <div className="py-1 px-4 bg-blue-50 rounded-full inline-flex items-center gap-2">
                      <span className="text-sm font-semibold text-blue-700">
                        {current.data?.current.condition.text}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Нижня частина: Додаткові показники (Вітер, Вологість, Відчуття) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-50 pt-8">
                  {/* Відчувається як */}
                  <div
                    className="flex flex-col items-center md:items-start p-4 rounded-3xl ">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400  mb-1">Відчувається як</span>
                    <span
                      className="text-2xl font-semibold text-gray-800">{current.data?.current.feelslike_c}°C</span>
                  </div>

                  {/* Вологість */}
                  <div
                    className="flex flex-col items-center md:items-start p-4 rounded-3xl ">
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Вологість</span>
                    <span className="text-2xl font-semibold text-gray-800">{current.data?.current.humidity}%</span>
                  </div>

                  {/* Вітер */}
                  <div
                    className="flex flex-col items-center md:items-start p-4 rounded-3xl ">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Вітер</span>
                    <span className="text-2xl font-semibold text-gray-800">
                      {current.data?.current.wind_kph} <span className="text-sm font-normal text-gray-400">км/г</span>
                    </span>
                  </div>
                </div>
              </div>
            </section>


            {/* Forecast Section */}

            <section className="">
              <h2 className='text-3xl font-bold mb-4'>Прогноз на тиждень</h2>

              <div className="flex align-middle gap-1 bg-white rounded-3xl p-4 overflow-x-auto pb-4 pt-2 snap-x scroll-smooth">
                {
                  forecast.data?.forecast.forecastday.map((forecastday: any) => {
                    return (
                      <div className='flex-1 bg-gray-50 font-bold p-6 rounded-t-2xl' key={forecastday.date}>

                        <div className='flex flex-col align-middle items-center gap-2'>
                          <span className='font-bold text-2xl '>
                            {new Date(forecastday.date).toLocaleDateString(undefined, { day: 'numeric', })}
                          </span>

                          <span className='text-zinc-400 font-medium'>
                            {new Date(forecastday.date).toLocaleDateString(undefined, { weekday: 'long', })}
                          </span>

                          <span className='text-blue-600 text-xl  font-semibold'>
                            {forecastday.day.avgtemp_c}°C
                          </span>
                        </div>

                        <div className='flex flex-col'>
                          <HourlyForecast key={forecastday.date} hours={forecastday.hour} />
                        </div>

                      </div>
                    )
                  })
                }
              </div>
            </section>

          </div>
        </main>

        <Modal status={modalStatus} setModalStatus={setModalStatus} />
      </div>

    </>

  );
};
