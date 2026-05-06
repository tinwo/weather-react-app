import {useWeatherParams} from "../../context";
import {useHistory} from "../../context";

interface SearchWeatherCardProps {
  data: any;
  setModalStatus: (status: boolean) => void;
}

const SearchWeatherCard = ({data, setModalStatus}: SearchWeatherCardProps): React.ReactElement => {
  const {setCity} = useWeatherParams();
  const {addToHistory} = useHistory();

  const onClickHandler = (): void => {

    addToHistory(data);

    setCity(data.name);

    setModalStatus(false);
  }

  return (
      <>
        <div
            className="group flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200"
            onClick={onClickHandler}
        >
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {data.name}
            </span>
              <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              {data.country}
            </span>
            </div>

            <span className="text-[12px] text-gray-400">
            {data.region || `${data.lat.toFixed(1)}, ${data.lon.toFixed(1)}`}
          </span>
          </div>

          <svg
              className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </>
  );
};

export default SearchWeatherCard;