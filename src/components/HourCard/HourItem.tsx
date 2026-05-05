import './HoursItem.css';


const HourItem = ({ hourData }: { hourData: any }) => {
  const time = hourData.time.split(' ')[1];

  return (
    // <div className=" bg-white mb-2 rounded-2xl flex flex-col align-middle justify-center">
    //   <div className="">{time}</div>
    //   <img className=''
    //       src={`https:${hourData.condition.icon}`}
    //       alt={hourData.condition.text}
    //       title={hourData.condition.text}
    //   />
    //   <div className="">{Math.round(hourData.temp_c)}°</div>
    //   {/* Відображаємо ймовірність дощу, якщо вона висока */}
    //   {/*{hourData.chance_of_rain > 0 && (*/}
    //   {/*    <div className="">💧 {hourData.chance_of_rain}%</div>*/}
    //   {/*)}*/}
    // </div>

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