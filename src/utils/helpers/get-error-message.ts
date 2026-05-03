import {API_ERRORS} from "../api-error-messages.ts";


export const getErrorMessage = (code?: number | undefined): string => {
    return API_ERRORS[code ?? 1] || API_ERRORS[1];
}