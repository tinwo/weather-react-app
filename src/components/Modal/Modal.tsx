
import './Modal.css';
import {useEffect, useState} from "react";
import {useSearchWeather} from "../../hooks";

interface ModalProps {
    status: boolean;
    setModalStatus: (status: boolean) => void;
}

const Modal = ({status, setModalStatus}: ModalProps) => {

    const [searchValue, setSearchValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');
    const searchWeather = useSearchWeather(debouncedValue);

    useEffect((): () => void => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchValue);
        }, 600);

        return (): void => {clearTimeout(handler)};
    }, [searchValue]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        setSearchValue(event.target.value);
    }


    return (
        <div  className={status ? 'modal active' : 'modal'} onClick={() => setModalStatus(false)}>

            <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <div className="modal__title">
                        <h2>Search Weather</h2>
                    </div>
                </div>
                <div className="modal__body">
                    <div className="modal__content content">

                        <form className="content__header">
                            <input type="text" value={searchValue} onChange={onChangeHandler}/>

                            {searchValue.trim().length ? <button onClick={() => setSearchValue('')}>remove</button> : null}
                        </form>

                        <div className="content__body">
                            {/* Відображаємо стани всередині контенту */}
                            {searchWeather.isLoading && <p className="p-4 text-center">Loading...</p>}

                            {searchWeather.isError && (
                                <p className="text-red-500 p-4">
                                    {searchWeather.error instanceof Error ? searchWeather.error.message : 'Error'}
                                </p>
                            )}

                            {searchWeather.data?.map((item: any): React.ReactElement => {
                                return (
                                    <div key={item.id}>
                                        <div>{item.name}</div>
                                        <div>{item.region}</div>
                                        <div>{item.country}</div>
                                        <div>{item.lat}</div>
                                        <div>{item.lon}</div>
                                        <div>{item.url}</div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default Modal;