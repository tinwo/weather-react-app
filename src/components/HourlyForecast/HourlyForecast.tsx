import  './HourlyForecast.css';
import HourItem from "../HourCard/HourItem.tsx";

const HourlyForecast = ({ hours }: { hours: any[] }) => {
  const safeHours = hours || [];
  return (
      <div className="hourly-wrapper">
        <div className="hourly-list">
          {safeHours.map((hour: any) => (
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