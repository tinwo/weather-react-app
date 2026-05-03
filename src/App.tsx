import './App.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {WeatherDashboard} from "./components";

import { WeatherProvider } from './context'

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <WeatherProvider>
                <WeatherDashboard></WeatherDashboard>
            </WeatherProvider>
        </QueryClientProvider>
    )
}

