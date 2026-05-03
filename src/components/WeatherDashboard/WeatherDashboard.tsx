import {useCurrentWeather} from "../../hooks";


export const WeatherDashboard = () => {
    const current = useCurrentWeather();

    if (current.isLoading) return <p>Loading...</p>;

    if (current.isError && current.error) return <p>{current.error instanceof Error && current.error.message }</p>

    return (
        <div>
            <h1>Weather Dashboard</h1>
            <div>
                <section>
                    <h1>Зараз у {current.data.location.name}</h1>
                    <p>{current.data.current.temp_c}°C</p>
                </section>

                {/*<section>*/}
                {/*    <h2>Прогноз на тиждень</h2>*/}
                {/*    {forecast.data.forecast.forecastday.map(day => (*/}
                {/*        <div key={day.date}>{day.day.avgtemp_c}°C</div>*/}
                {/*    ))}*/}
                {/*</section>*/}
            </div>
        </div>
    );
};
