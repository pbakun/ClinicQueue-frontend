import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/api/",
    // baseURL: "http://apitest.bakson.hostingasp.pl/api/",
    // timeout: 5000
});