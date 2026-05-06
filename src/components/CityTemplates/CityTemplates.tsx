import {citiesTemplates} from "../../data";
import {useWeatherParams} from "../../context";


const CityTemplates = (): React.ReactElement => {
  const {setCity} = useWeatherParams();
  const weatherTemplateHandler = (city: string): void => {
    setCity(city);
  }
  return (
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
  );
};

export default CityTemplates;