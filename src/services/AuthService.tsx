import api from "../utils/api";
import { v4 as uuidv4 } from "uuid";

const headers = {
  headers: {
    SessionId: uuidv4(),
  },
};

export const login = (data) => {
  return api.post("/Login/Login", data, headers);
};
export const logout = () => {
  return api.post("/Login/Logout", headers);
};
