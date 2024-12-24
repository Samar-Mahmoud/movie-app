import axios from "axios";

const fetch = axios.create({
  baseURL: "http://localhost:5000/",
});

export default fetch;
