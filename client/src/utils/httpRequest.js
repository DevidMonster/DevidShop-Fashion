import axios from "axios";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const httpRequest = axios.create({
    baseURL: "http://localhost:8000",
})

export const get = async (path, option = {}) => {
    const response = await httpRequest.get(path, option);
    return response.data;
};
