import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
  return instance.get("/medical-records");
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

export default {
  getAll,
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
};
