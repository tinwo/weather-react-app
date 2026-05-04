import './HistoryList.css';
import {useEffect, useState} from "react";

const HistoryList = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('weather_history');
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [history]);

  const clearHistory = () => {
    localStorage.removeItem('weather_history');
    setHistory([]);
  };

  const removeFromHistory = (cityName: string) => {
    const saved = localStorage.getItem('weather_history');
    if (!saved) return;

    const history = JSON.parse(saved);
    // Фільтруємо, залишаючи всі міста, крім обраного
    const updatedHistory = history.filter(item => item.name !== cityName);

    localStorage.setItem('weather_history', JSON.stringify(updatedHistory));
    // Не забудьте оновити стейт після цього!
  };

  if (history.length === 0) return null;


  return (
      <div className="history-section">
        <h3>Збережені:</h3>
        <button onClick={clearHistory}>Очистити</button>

        <div className="history-grid">
          {history.map((item: any) => (
              <div key={item.name + item.lat} className="history-item">
                <span>{item.name}</span>
                <small>{item.country}</small>

                <button onClick={() => removeFromHistory(item.name)}>remove</button>
                {/* Тут можна додати кнопку видалення конкретного запису */}
              </div>
          ))}
        </div>
      </div>
  );
};

export default HistoryList;