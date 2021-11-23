export const handleLogin = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return true;
};

export const handleLogout = () => {
  localStorage.clear();
};

export const getUser = () => {
  let cooky = localStorage.getItem("user");
  let user = cooky && JSON.parse(cooky);
  return user;
};
export const getToken = () => {
  let token = localStorage.getItem("token");
  return token;
};
