import './HourlyForecast.css';
import HourItem from "../HourCard/HourItem.tsx";

const HourlyForecast = ({ hours }: { hours: any[] }) => {
  const safeHours = hours || [];

  const indexes = [0, 3, 6, 9, 12, 15, 18, 21, 23]
  return (
    <div className="flex flex-col p-2 ">
      <div className="">
        {safeHours.filter((item: any, index: number) => indexes.includes(index)).map((hour: any, index: number) => (
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