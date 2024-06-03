import axios from "axios";
import { AppURL } from "./../apis/AppURL";
import { redirect } from "react-router-dom";

export const checkTokenValidity = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return redirect("/login");
    }

    const response = await axios.post(AppURL.checkToken(), null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return null;
    }
  } catch (error) {
    console.error("Token validation failed", error);
  }

  return redirect("/login");
};

export const checkUserType = () => {
  const userData = localStorage.getItem("user");
  if (!userData) return null;
  try {
    const { role } = JSON.parse(userData);
    return role;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const getUserId = () => {
  const userData = localStorage.getItem("user");
  if (!userData) return null;
  try {
    const { id } = JSON.parse(userData);
    return id;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};
