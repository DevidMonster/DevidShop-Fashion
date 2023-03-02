import axios from "axios";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

export const get = async (path, option = {}) => {
    const response = await httpRequest.get(path, option);
    return response.data;
};

export const post = async (path, option = {}) => {
    const response = await httpRequest.post(path, option);
    return response.data;
};

export const put = async (path, option = {}) => {
    const response = await httpRequest.put(path, option);
    return response.data;
};

export const deleteRequest = async (path, option = {}) => {
    const response = await httpRequest.delete(path, option);
    return response.data;
};
