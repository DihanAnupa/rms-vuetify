import axios from  "axios";

export default axios.create({
    baseURL: "http://localhost:8090/api", //server spring boot app runs
    headers:{
        "Content-type": "application/json"
    }
});