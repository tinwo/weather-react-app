import './SearchWeatherCard.css';
import {useWeatherParams} from "../../context";

interface SearchWeatherCardProps {
  data: any;
  setModalStatus: (status: boolean) => void;
}

const SearchWeatherCard = ({data, setModalStatus}: SearchWeatherCardProps): React.ReactElement => {
  const {setCity} = useWeatherParams();

  const onClickHandler = (): void => {

    saveToHistory(data);

    setCity(data.name);

    setModalStatus(false);
  }

  const saveToHistory = (newItem: any) => {
    // Get existing history or create an empty array
    const rawHistory = localStorage.getItem('weather_history');

    let history: any[] = rawHistory ? JSON.parse(rawHistory) : [];

    // Check if the city is already in history to avoid duplicates
    const exists = history.find((item: any) => item.name === newItem.name);

    if (!exists) {
      // Add new item to the start of the array
      const updatedHistory = [newItem, ...history].slice(0, 5); // Keep only last 5 searches
      localStorage.setItem('weather_history', JSON.stringify(updatedHistory));
    }

  }

  return (
      <div className="card" onClick={onClickHandler}>
        <div><b>{data.name}</b></div>
        <div>{data.country}</div>
        <div>{data.region}</div>
        <div>{data.lat}</div>
        <div>{data.lon}</div>
        <a href={data.url} target='_blank'>{data.url}</a>
      </div>
  );
};

export default SearchWeatherCard;