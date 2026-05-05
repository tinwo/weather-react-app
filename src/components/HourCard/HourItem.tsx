import './HoursItem.css';
import type {HourlyForecast} from "../../interfaces";

interface HourItemProps {
  hourData: HourlyForecast;
}

const HourItem = ({ hourData }: HourItemProps) => {
  const time = hourData.time.split(' ')[1];

  return (


    <div className="bg-white rounded-2xl mb-2 flex flex-col items-center p-2 min-w-[45px] ">
      <span className="text-[11px] text-gray-400 font-medium">{time}</span>

      <img
        className="w-8 h-8 my-0.5"
        src={`https:${hourData.condition.icon}`}
        alt=""
      />

      <span className="text-sm font-semibold text-gray-700">
        {Math.round(hourData.temp_c)}°
      </span>

      {hourData.chance_of_rain > 0 && (
        <span className="text-[9px] text-blue-400 font-bold leading-none">
          {hourData.chance_of_rain}%
        </span>
      )}
    </div>
  );
};

export default HourItem;