import axios from "axios";


export const loginUser = async (email, password) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};
export const SignupUser = async (name,email, password) => {
  const res = await axios.post("/user/signup", { name , email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export  const CheckAuthStatus = async () => {
  try {
    const res = await axios.get("/user/auth-status", {
      withCredentials: true, // Include cookies
    });
    if (res.status !== 200) {
      throw new Error("Unable to verify token");
    }
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Token verification failed");
  }
};
export const sendChatRequest = async (message) => {
  const res = await axios.post("/chats/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};
export const getUserChats = async () => {
  const res = await axios.get("/chats/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};
export const deleteUserChats = async () => {
  const res = await axios.delete("/chats/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};
export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};
