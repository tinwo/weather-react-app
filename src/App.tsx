import './App.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {WeatherDashboard} from "./components";

import {WeatherProvider, HistoryProvider} from './context'

const queryClient = new QueryClient();

export const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <WeatherProvider>
          <HistoryProvider>
            <WeatherDashboard></WeatherDashboard>
          </HistoryProvider>
        </WeatherProvider>
      </QueryClientProvider>
  )
}

