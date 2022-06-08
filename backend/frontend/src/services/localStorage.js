const saveTokenOnLS = (data) => {
  localStorage.setItem("token", data.user.token);
};
const getTokenOnLS = (key) => {
  return localStorage.getItem(key);
};

const removeTokenOnLS = () => {
  localStorage.removeItem("token");
};

export { saveTokenOnLS, getTokenOnLS, removeTokenOnLS };
