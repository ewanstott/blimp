export const saveStore = (state) => {
  localStorage.setItem("store", JSON.stringify(state));
};

export const getStore = () => {
  return JSON.parse(localStorage.getItem("store"));
};
