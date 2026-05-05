import { useEffect, useState } from "react";
import { useSearchWeather } from "../../hooks";
import SearchWeatherCard from "../SearchWeatherCard/SearchWeatherCard.tsx";
import type {SearchLocation} from "../../interfaces";
import * as React from "react";

interface ModalProps {
  status: boolean;
  setModalStatus: (status: boolean) => void;
}

const Modal = ({ status, setModalStatus }: ModalProps) => {

  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const searchWeather = useSearchWeather(debouncedValue);

  useEffect((): () => void => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 600);

    return (): void => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  }

  const onCloseHandler = (): void => {
    setSearchValue((prev) => {
      return '';
    });

    setDebouncedValue('');

    setModalStatus(false);
  }

  useEffect(() => {
    return () => {
      if (!status) {
        setSearchValue('');
        setDebouncedValue('');
      }
    }
  }, [status]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${status ? 'opacity-100 visible backdrop-blur-sm bg-black/20' : 'opacity-0 invisible'
          }`}
        onClick={onCloseHandler}
      >
        <div
          className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-300"
          style={{ transform: status ? 'translateY(0)' : 'translateY(20px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Пошук</h2>
            <button onClick={() => setModalStatus(false)} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            {/* Search Input Group */}
            <form
              className="relative flex items-center mb-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                value={searchValue}
                onChange={onChangeHandler}
                placeholder="Введіть місто"
                className="w-full pl-4 pr-12 py-3 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none transition-all placeholder:text-gray-400 text-gray-700"
              />

              {searchValue.trim().length > 0 && (
                <button
                  onClick={() => setSearchValue('')}
                  className="absolute right-3 p-1.5 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </form>

            {/* Results Body */}
            <div className="max-height-[60vh] overflow-y-auto custom-scrollbar">
              {searchWeather.isLoading && (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              )}

              {searchWeather.isError && (
                <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm mb-4">
                  {searchWeather.error instanceof Error ? searchWeather.error.message : 'Something went wrong'}
                </div>
              )}

              <div className="space-y-3">
                {searchWeather.data?.map((item: SearchLocation): React.ReactElement => (
                  <SearchWeatherCard
                    setModalStatus={setModalStatus}
                    key={item.id}
                    data={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;