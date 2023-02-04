import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
  return instance.get("/users");
};

export const getById = (id) => {
  return instance.get(`/users/${id}`);
};

export const remove = (id) => {
  return instance.delete(`/users/${id}`);
};

export const getCurrentRole = () => {
  return instance.get("/users/current-role");
};

export const getAllUsernames = () => {
  return instance.get("/users/usernames");
};

export const getCurrentId = () => {
  return instance.get("/users/current-id");
};

export const getCurrentUser = () => {
  return instance.get("/users/current-user");
};

export default {
  getAll,
  getById,
  remove,
  getCurrentRole,
  getAllUsernames,
  getCurrentId,
  getCurrentUser,
};
