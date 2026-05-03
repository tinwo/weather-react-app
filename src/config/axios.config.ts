

import axios from 'axios';

import {getErrorMessage} from "../utils/helpers/get-error-message.ts";

const isDev =  import .meta.env.DEV;
const apiKey = import .meta.env.VITE_WEATHER_API_KEY;

const weatherHTTPClient = axios.create({
    baseURL: apiKey,
    timeout: 5000,
});

// Interceptors: REQUEST
weatherHTTPClient.interceptors.request.use(
    (config) => {
    config.params = {
        ...config.params,
        key: apiKey
    }

    if (isDev) {
        console.log(`[Axios: REQUEST] ${config.baseURL}${config.url}`, config.params);
    }

    return config;
},
    (error) => {Promise.reject(error)}
)

// Interceptors: RESPONSE
weatherHTTPClient.interceptors.response.use((response) => response, (error) => {
    let finalMessage;

    if (error.response) {
        const { status, data } = error.response;

        // Get Status or Code
        const apiCode = data?.error?.code || status;

        finalMessage = getErrorMessage(apiCode);

    } else if (error.request) {
        // Network Error ( No Internet )
        finalMessage = getErrorMessage(0);

    } else {
        finalMessage = error.message;
    }

    return Promise.reject(new Error(finalMessage));
})