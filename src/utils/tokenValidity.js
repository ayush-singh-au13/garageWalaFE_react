import { isExpired, decodeToken } from "react-jwt";
const token = localStorage.getItem("token");

export const LoggedInToken = () => {
  const myDecodedToken = decodeToken(token);
  console.log(myDecodedToken);
  const isMyTokenExpired = isExpired(token);
  if (isMyTokenExpired) {
    localStorage.removeItem("token");
    window.location.replace("/login");
  }
  const tokenStatus = localStorage.getItem("token") ? true : false;
  
  if (!tokenStatus) {
    window.location.replace("/login");
  }
  
};

export const loggedOutToken = () => {
  const tokenStatus = localStorage.getItem("token") ? true : false;
  if (tokenStatus) {
    window.location.replace("/dashboard");
  }
};
