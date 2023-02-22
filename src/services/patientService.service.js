import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
  return instance.get("/patients");
};

export const getById = (id) => {
  return instance.get(`/patients/${id}`);
};

export const findSinglePatient = (id) => {
  return instance.get(`/patients/single-patient/${id}`);
};

export const getAllRecordsByPatientId = (id) => {
  return instance.get(`patients/patient-records/${id}`);
};

export const insert = (patient) => {
  return instance.post("/patients", patient);
};

export const getGenderById = (id) => {
  return instance.get(`patients/gender/${id}`);
};

export default {
  getAll,
  getById,
  insert,
  findSinglePatient,
  getAllRecordsByPatientId,
  getGenderById,
};
