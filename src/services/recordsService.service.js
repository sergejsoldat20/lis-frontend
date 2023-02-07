import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
  return instance.get("/medical-records");
};

export const getPaginated = (page, size) => {
  return instance.get(`/medical-records/paginated?page=${page}&?size=${size}`);
};

export const getRecordById = (id) => {
  return instance.get(`/medical-records/${id}`);
};

export const getBiochemistries = () => {
  return instance.get("/biochemistries");
};

export const getHematologies = () => {
  return instance.get("/hematologies");
};

export const getUrines = () => {
  return instance.get("/urines");
};

export const deleteRecord = (id) => {
  return instance.delete(`/medical-records/${id}`);
};

export const insertRecord = (record) => {
  return instance.post("/medical-records", record);
};

export const insertBiochemistry = (biochemistry) => {
  return instance.post("/biochemistries", biochemistry);
};

export const insertUrine = (urine) => {
  return instance.post("/urines", urine);
};

export const insertHematology = (hematology) => {
  return instance.post("/hematologies", hematology);
};

export const getInvalidRecords = () => {
  return instance.get("/medical-records/invalid-records");
};

export const validate = (id) => {
  return instance.post(`/medical-records/validate/${id}`);
};

export const getBiochemistryById = (id) => {
  return instance.get(`/biochemistries/${id}`);
};

export const getHematologyById = (id) => {
  return instance.get(`/hematologies/${id}`);
};

export const getUrineById = (id) => {
  return instance.get(`/urines/${id}`);
};

export default {
  getAll,
  getPaginated,
  getRecordById,
  validate,
  getBiochemistries,
  getHematologies,
  getUrines,
  insertBiochemistry,
  insertHematology,
  insertUrine,
  insertRecord,
  deleteRecord,
  getInvalidRecords,
  getBiochemistryById,
  getHematologyById,
  getUrineById,
};
