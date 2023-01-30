const CheckIfAdmin = () => {
  const role = localStorage.getItem("role");
  if (role === "ADMIN") {
    return true;
  } else {
    return false;
  }
};
export default CheckIfAdmin;
