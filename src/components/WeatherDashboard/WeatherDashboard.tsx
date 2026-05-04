import {useCurrentWeather} from "../../hooks";
import Modal from "../Modal/Modal.tsx";
import {useState} from "react";


export const WeatherDashboard = () => {
    const current = useCurrentWeather();
    const [modalStatus, setModalStatus] = useState<boolean>(false);

    if (current.isLoading) return <p>Loading...</p>;

    if (current.isError && current.error) return <p>{current.error instanceof Error && current.error.message }</p>

    const onModalHandler = (): void => {
        setModalStatus(true);
    }

    return (
        <div>
            <h1>Weather Dashboard</h1>
            <div>
                <section>
                    <h1>Зараз у {current.data.location.name}</h1>
                    <p>{current.data.current.temp_c}°C</p>
                    <button onClick={onModalHandler}>Search</button>
                </section>

                {/*<section>*/}
                {/*    <h2>Прогноз на тиждень</h2>*/}
                {/*    {forecast.data.forecast.forecastday.map(day => (*/}
                {/*        <div key={day.date}>{day.day.avgtemp_c}°C</div>*/}
                {/*    ))}*/}
                {/*</section>*/}

                <Modal status={modalStatus} setModalStatus={setModalStatus}></Modal>
            </div>
        </div>
    );
};
