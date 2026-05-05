import {useCurrentWeather, useForecastWeather} from "../../hooks";
import {useState} from "react";
import {useWeatherParams} from "../../context";
import HistoryList from "../HistoryList/HistoryList.tsx";
import LanguageSelect from "../LanguageSelect/LanguageSelect.tsx";
import Modal from "../Modal/Modal.tsx";

import {ForecastBoard} from "../ForecastBoard";
import CurrentWeatherCard from "../CurrentWeatherCard/CurrentWeatherCard.tsx";
import CityTemplates from "../CityTemplates/CityTemplates.tsx";


export const WeatherDashboard = () => {
  const {params} = useWeatherParams();
  const current = useCurrentWeather();
  const [days, setDays] = useState(new Date());
  const [langValue, setLangValue] = useState('uk')

  const forecast = useForecastWeather({query: params.query, lang: params.lang});
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const onModalHandler = (): void => {
    setModalStatus(true);
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
            <CityTemplates></CityTemplates>

            <section>
              <HistoryList/>
            </section>


            <div className="space-y-6">

              {current.isLoading && (
                  <div className="flex justify-center p-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
              )}

              {current.isError && (
                  <section>
                    <h2 className='text-3xl font-bold mb-4'>Поточний прогноз</h2>
                    <div className="bg-white rounded-2xl p-6">
                      <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm">
                        {current.error instanceof Error && current.error.message}
                      </div>
                    </div>
                  </section>
              )}

              {/* Current Weather Card */}

              {!current.isLoading && current.data && <CurrentWeatherCard data={current.data}></CurrentWeatherCard>}

              {/* Forecast Section */}
              {
                !forecast.isLoading && forecast.data && current.data && <ForecastBoard data={forecast?.data}></ForecastBoard>
              }

              { forecast.isError && (

                  <section className="bg-white rounded-2xl p-6">
                    <h2 className='text-3xl font-bold mb-4'>Прогноз на тиждень</h2>
                    <div className="bg-white rounded-2xl p-6">
                      <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm">
                        {forecast.error instanceof Error && forecast.error.message}
                      </div>
                    </div>

                  </section>

              )}

            </div>
          </main>

          <Modal status={modalStatus} setModalStatus={setModalStatus}/>
        </div>

      </>

  );
};
