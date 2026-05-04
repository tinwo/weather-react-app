import {useCurrentWeather, useForecastWeather} from "../../hooks";
import Modal from "../Modal/Modal.tsx";
import {useState} from "react";
import {useWeatherParams} from "../../context";
import HourlyForecast from "../HourlyForecast/HourlyForecast.tsx";
import HistoryList from "../HistoryList/HistoryList.tsx";

const citiesTemplates: string[] = [
  'Kyiv', 'Berlin', 'London', 'Tokio', 'Moscow', 'Paris',
];

export const WeatherDashboard = () => {
  const { params , setCity} = useWeatherParams();
  const current = useCurrentWeather();
  const [days, setDays] = useState(new Date());
  const forecast = useForecastWeather({ query: params.query});
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const onModalHandler = (): void => {
    setModalStatus(true);
  }

  const weatherTemplateHandler = (city: string): void => {
    setCity(city);
  }

  return (
      <div>
        <h1>Weather Dashboard</h1>



        <section>
         <h3>Templates:</h3>
          {citiesTemplates.map((city: string, index: number) => {
            return (
                <button key={city + index} onClick={() => weatherTemplateHandler(city)}>{city}</button>
            )
          })}

        </section>

        <section>

          <HistoryList></HistoryList>

        </section>
        <div>

          {current.isLoading && <p >Loading...</p>}

          {current.isError && (
              <p >
                {current.error instanceof Error && current.error.message}
              </p>
          )}

          <section>
            <h1>Зараз у {current.data?.location?.name}</h1>
            <p>{current.data?.current.temp_c}°C</p>
            <button onClick={onModalHandler}>Search</button>
          </section>

          <section>
              <h2>Прогноз на тиждень</h2>
              <div style={{display: "flex", flexDirection: "column", gap: '1rem'}}>

                {forecast.data?.forecast.forecastday.map((item: any) => (
                    <div key={item.date}>
                     <span> <b>{new Date(item.date).toLocaleDateString()}</b> </span>
                     <span> {item.day.avgtemp_c}°C </span>


                      <HourlyForecast key={item.date} hours={item.hour}></HourlyForecast>
                    </div>

                ))}

              </div>
          </section>

          <Modal status={modalStatus} setModalStatus={setModalStatus}></Modal>
        </div>
      </div>
  );
};
