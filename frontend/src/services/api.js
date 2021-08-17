import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: "https://firemonitor.herokuapp.com",
});

api.interceptors.response.use(
    response => response,
    async error => {
        try {
            toast.error("Erro ao buscar os dados do servidor");
        } catch (error) {
            console.log(error);
        }
        return Promise.reject(error);
    }
);


window.axios = api
export {
    api,
};
