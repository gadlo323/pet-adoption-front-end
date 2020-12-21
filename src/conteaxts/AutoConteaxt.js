import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AutoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //signUp
  const signupUser = async (data) => {
    const url = "http://localhost:5000/signup";
    try {
      const res = await axios.post(url, data);
      setCurrentUser(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  //login
  const hendaleLogin = async (email, password) => {
    const url = "http://localhost:5000/login";
    try {
      const res = await axios.post(url, { email: email, password: password });
      if (res.data) {
        setCurrentUser(res.data);
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //update
  const hendlaUpdate = async (data, id) => {
    try {
      const url = `http://localhost:5000/user/${id}`;
      const res = await axios.put(url, data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const value = {
    currentUser,
    signupUser,
    hendaleLogin,
    hendlaUpdate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
