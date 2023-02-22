import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
  return instance.get("/medical-records");
};

export const getPaginated = (page, size) => {
  const sortBy = "createdTime";
  const sortOrder = "desc";
  return instance.get(
    `/medical-records/paginated?page=${page}&size=${size}&sort=${sortBy},${sortOrder}`
  );
};

export const getAllByDate = (page, size, createdTime) => {
  const sortBy = "createdTime";
  const sortOrder = "desc";
  return instance.get(
    `/medical-records/date-filtered?page=${page}&size=${size}&sort=${sortBy},${sortOrder}&createdTime=${createdTime}`
  );
};

export const getInvalidPaginated = (page, size) => {
  const sortBy = "createdTime";
  const sortOrder = "desc";
  return instance.get(
    `/medical-records/invalid-records?page=${page}&size=${size}&sort=${sortBy},${sortOrder}`
  );
};

export const getInvalidByDate = (page, size, createdTime) => {
  const sortBy = "createdTime";
  const sortOrder = "desc";
  return instance.get(
    `/medical-records/invalid-records/date-filtered?page=${page}&size=${size}&sort=${sortBy},${sortOrder}&createdTime=${createdTime}`
  );
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

export const getBorders = () => {
  return instance.get("/borders");
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

export const getBordersById = (id) => {
  return instance.get(`borders/${id}`);
};

export default {
  getAll,
  getInvalidByDate,
  getInvalidPaginated,
  getAllByDate,
  getPaginated,
  getRecordById,
  validate,
  getBiochemistries,
  getHematologies,
  getUrines,
  getBorders,
  insertBiochemistry,
  insertHematology,
  insertUrine,
  insertRecord,
  deleteRecord,
  getInvalidRecords,
  getBiochemistryById,
  getHematologyById,
  getUrineById,
  getBordersById,
};
