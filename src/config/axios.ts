import { baseUrl } from './../utils/staticData';
import axios from "axios";

export default axios.create({
    baseURL: `${baseUrl}/api/`,
});