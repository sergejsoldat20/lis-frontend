import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
  return instance.get("/patients");
};

export const getById = (id) => {
  return instance.get(`/patients/${id}`);
};

export const insert = (patient) => {
  return instance.post("/patients", patient);
};

export default {
  getAll,
  getById,
  insert,
};
