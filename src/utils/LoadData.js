import axios from "axios";
const LoadData = async (relativePath) => {
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const result = await axios.get(
    `http://localhost:9000/${relativePath}`,
    config
  );
  return result;
};
export default LoadData;
