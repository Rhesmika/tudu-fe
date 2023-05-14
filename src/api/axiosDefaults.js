import axios from "axios";

axios.defaults.baseURL = "https://tudu.herokuapp.com/";
// axios.defaults.baseURL = "https://8000-rhesmika-tuduapi-wzmbjhfp100.ws-us97.gitpod.io/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();