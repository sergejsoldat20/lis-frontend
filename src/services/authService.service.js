import base from "./base.service";

const instance = base.service(true);

export const register = (request) => {
  return instance.post("/api/auth/register", request);
};

export const changePassword = (request) => {
  return instance.post("/api/auth/cahnge-password", request);
};

export default {
  register,
  changePassword,
};
