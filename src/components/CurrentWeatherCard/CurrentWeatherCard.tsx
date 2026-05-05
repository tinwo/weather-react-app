import type {WeatherResponse} from "../../interfaces";

interface CurrentWeatherCardProps {
  data: WeatherResponse | undefined;
}

const CurrentWeatherCard = ({data}: CurrentWeatherCardProps): React.ReactElement => {
  return (
      <>
        <h2 className='text-3xl font-bold mb-4'>Поточна погода</h2>
        <section
            className="relative overflow-hidden bg-white rounded-[2.5rem] p-8 md:p-12  group transition-all ">

          <div className="">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-10">

              <div className="space-y-2 text-center md:text-left">

                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-gray-900 leading-tight">
                  {data?.location?.name}
                </h1>

                <p className="text-xl md:text-2xl font-medium text-gray-400 flex items-center justify-center md:justify-start gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  {data?.location?.country}
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end">
                <div className="flex items-center gap-4 mb-2">
                  <img
                      src={data?.current.condition.icon}
                      alt={data?.current.condition.text}
                      className="w-16 h-16 object-contain"
                  />
                  <div className="flex items-start">
                        <span
                            className="text-8xl md:text-9xl font-light tracking-tighter text-blue-600 leading-none">
                          {data?.current.temp_c}
                        </span>
                    <span className="text-4xl md:text-5xl font-light text-blue-400 mt-2">°</span>
                  </div>
                </div>

                <div className="py-1 px-4 bg-blue-50 rounded-full inline-flex items-center gap-2">
                      <span className="text-sm font-semibold text-blue-700">
                        {data?.current.condition.text}
                      </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-50 pt-8">

              <div
                  className="flex flex-col items-center md:items-start p-4 rounded-3xl ">
                <span
                    className="text-[10px] font-bold uppercase tracking-widest text-gray-400  mb-1">Відчувається як</span>
                <span
                    className="text-2xl font-semibold text-gray-800">{data?.current.feelslike_c}°C</span>
              </div>

              <div
                  className="flex flex-col items-center md:items-start p-4 rounded-3xl ">
                    <span
                        className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Вологість</span>
                <span className="text-2xl font-semibold text-gray-800">{data?.current.humidity}%</span>
              </div>

              <div
                  className="flex flex-col items-center md:items-start p-4 rounded-3xl ">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Вітер</span>
                <span className="text-2xl font-semibold text-gray-800">
                      {data?.current.wind_kph} <span className="text-sm font-normal text-gray-400">км/г</span>
                    </span>
              </div>
            </div>
          </div>
        </section>
      </>
  );
};

export default CurrentWeatherCard;