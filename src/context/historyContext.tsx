import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface HistoryItem {
  name: string;
  country: string;
  lat: number;
  lon: number;
  [key: string]: any;
}

interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (cityData: HistoryItem) => void; // Виправлено: приймає об'єкт, а не масив
  removeFromHistory: (cityName: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('weather_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('weather_history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (cityData: HistoryItem) => {
    setHistory((prev) => {

      const filtered = prev.filter((item) => item.name !== cityData.name);

      return [cityData, ...filtered].slice(0, 5);
    });
  };

  const removeFromHistory = (cityName: string) => {
    setHistory((prev) => prev.filter((item) => item.name !== cityName));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
      <HistoryContext.Provider value={{ history, addToHistory, removeFromHistory, clearHistory }}>
        {children}
      </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};