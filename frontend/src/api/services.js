import API from "./axios";

export const login = (body) => {
  return API.post("api/user/login", body);
};
export const register = (body) => {
  return API.post("/api/user/register", body);
};

export const getUserDetails = (body) => {
  return API.get("/api/user/details", body);
};

export const logout = () => {
  return API.post("/api/user/logout");
};
