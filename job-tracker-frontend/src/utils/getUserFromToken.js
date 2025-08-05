// src/utils/getUserFromToken.js
import jwt_decode from "jwt-decode";

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    return decoded;
  } catch (err) {
    console.error("Invalid token");
    localStorage.removeItem("token");
    return null;
  }
};
