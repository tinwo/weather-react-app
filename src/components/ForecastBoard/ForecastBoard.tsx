import type {ForecastDay, WeatherForecastResponse} from "../../interfaces";
import HourlyForecast from "../HourlyForecast/HourlyForecast.tsx";


interface ForecastBoardProps {
  data: WeatherForecastResponse | undefined;
}

export const ForecastBoard = ({data}:ForecastBoardProps): React.ReactElement => {
  return (
      <section className="">
        <h2 className='text-3xl font-bold mb-4'>Прогноз на тиждень</h2>

        <div className="flex align-middle gap-1 bg-white rounded-3xl p-4 overflow-x-auto pb-4 pt-2 snap-x scroll-smooth">
          {
            data?.forecast.forecastday.map((forecastday: ForecastDay) => {
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
  );
};

