const CheckIfNurse = () => {
  const role = localStorage.getItem("role");
  if (role === "NURSE") {
    return true;
  } else {
    return false;
  }
};
export default CheckIfNurse;
