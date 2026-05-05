import './HistoryList.css';
import { useHistory } from "../../context";
import { useWeatherParams } from "../../context";

const HistoryList = () => {
  const { setCity } = useWeatherParams();
  const { history, clearHistory, removeFromHistory } = useHistory();

  if (history && history.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Історія</h2>

        {history && history?.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-xs font-medium hover:bg-gray-100 px-8 py-3 rounded-2xl hover:cursor-pointer text-red-400 hover:text-red-600 transition-colors tracking-wider"
          >
            Очистити все
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {history && history.map((item) => {
          return (
            <div
              onClick={() => {
                setCity(item.name)
              }}
              key={item.name + item.lat}
              className="group flex items-center justify-between p-3 bg-gray-100 hover:cursor-pointer hover:bg-gray-200 rounded-2xl transition-all duration-200"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 leading-tight">
                  {item.name}
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                  {item.country}
                </span>
              </div>

              <button
                onClick={() => removeFromHistory(item.name)}
                className="p-1.5 rounded-full text-gray-300 hover:text-red-400 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                title="Видалити"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )
        })}

        {history && history?.length === 0 && (
          <p className="col-span-full text-center py-4 text-sm text-gray-400 italic">
            Історія пошуку порожня
          </p>
        )}
      </div>
    </div>
  );
};

export default HistoryList;