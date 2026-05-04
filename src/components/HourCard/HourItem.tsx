import './HoursItem.css';


const HourItem = ({ hourData }: { hourData: any }) => {
  const time = hourData.time.split(' ')[1];

  return (
      <div className="hour-card">
        <div className="hour-time">{time}</div>
        <img
            src={`https:${hourData.condition.icon}`}
            alt={hourData.condition.text}
            title={hourData.condition.text}
        />
        <div className="hour-temp">{Math.round(hourData.temp_c)}°</div>
        {/* Відображаємо ймовірність дощу, якщо вона висока */}
        {hourData.chance_of_rain > 0 && (
            <div className="hour-rain">💧 {hourData.chance_of_rain}%</div>
        )}
      </div>
  );
};

export default HourItem;