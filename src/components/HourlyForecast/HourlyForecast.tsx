import './HourlyForecast.css';
import HourItem from "../HourCard/HourItem.tsx";
import type {HourlyForecast} from '../../interfaces'

interface HourlyForecastProps {
  hours: HourlyForecast[]
}

const HourlyForecast = ({ hours }: HourlyForecastProps) => {
  const safeHours = hours || [];

  const indexes = [0, 3, 6, 9, 12, 15, 18, 21, 23];

  return (
      <div className="flex flex-col p-2 ">
        <div className="">
          { safeHours
              .filter((_: HourlyForecast, index: number) => indexes.includes(index))
              .map((hour: HourlyForecast) => (
                <HourItem
                    key={hour.time_epoch}
                    hourData={hour}
                />
          ))}
        </div>
      </div>
  );
};

export default HourlyForecast;