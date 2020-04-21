import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-94deb.firebaseio.com/",
});

export default instance;
