import axios from "axios";

export const checkIfAdmin = async () => {
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const role = await axios.get(
    `http://localhost:9000/users/current-role`,
    config
  );
  if (role === "ADMIN") {
    return true;
  } else {
    return false;
  }
};
