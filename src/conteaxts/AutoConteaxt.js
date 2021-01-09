import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AutoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const baseUrl = "https://adoptfriend.herokuapp.com";
  const objCookies = {
    withCredentials: true,
  };

  //userActive
  const userActive = async () => {
    try {
      const isToken = Cookies.get("token");
      if (isToken) {
        const tokenRes = await axios.post(
          `${baseUrl}/user/tokenValid`,
          {},
          objCookies
        );
        const user = jwt(tokenRes.data);
        setCurrentUser(user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      return err.response.data;
    }
  };

  useEffect(() => {
    userActive();
    return () => userActive();
  }, []);

  //signUp
  const signupUser = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/signup`, data, objCookies);
      setCurrentUser(res.data);
      return { error: 0, dataSevere: res.data };
    } catch (error) {
      return { error: 1, dataSevere: error.response.data };
    }
  };
  //login
  const hendaleLogin = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/login`, data, objCookies);
      if (res.data) {
        setCurrentUser(res.data);
        return res.data;
      }
    } catch (error) {
      return false;
    }
  };

  //Logout

  const logOut = () => {
    Cookies.remove("token");
    setCurrentUser();
    history.push("/");
  };
  //update
  const hendlaUpdate = async (data) => {
    try {
      const res = await axios.patch(
        `${baseUrl}/user/${currentUser.uId}`,
        data,
        objCookies
      );
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };

  //getUser full
  const getUser = async (uId) => {
    try {
      const res = await axios.get(`${baseUrl}/userFull/${uId}`, objCookies);
      const data = res.data;
      return data;
    } catch (err) {
      return err.response.data;
    }
  };
  //getUser basic info
  const userInfo = async (uId) => {
    try {
      const res = await axios.get(`${baseUrl}/user/${uId}`, objCookies);
      const data = res.data;
      return data;
    } catch (err) {
      return err.response.data;
    }
  };

  //addPet to db
  const addPet = async (content) => {
    try {
      const res = await axios.post(`${baseUrl}/addpet`, content, objCookies);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      return err.response.data;
    }
  };

  //edit Pet to db
  const editPet = async (content, id, cloudinary_id) => {
    try {
      const res = await axios.patch(
        `${baseUrl}/editpet/?id=${id}&cloudId=${cloudinary_id}`,
        content,
        objCookies
      );
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      return err.response.data;
    }
  };

  //get one Pet from db
  const getPet = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}/pet/${id}`, objCookies);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      return err.response.data;
    }
  };

  //serach Advance
  const serach = async (page, perPage, data) => {
    try {
      const res = await axios.post(
        `${baseUrl}/search/?page=${page}&per_page=${perPage}`,
        data
      );
      if (res.data) {
        return { error: 0, dataSevere: res.data };
      }
    } catch (err) {
      return { error: 1, dataSevere: err.response.data };
    }
  };

  //adopte or foster
  const adopteOrFoster = async (data, type) => {
    try {
      const res = await axios.post(
        `${baseUrl}/adopteFoster/${currentUser.uId}`,
        { data: data, type: type },
        objCookies
      );
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };
  //save pet
  const savePet = async (data) => {
    try {
      const res = await axios.post(
        `${baseUrl}/savePet/${currentUser.uId}`,
        data,
        objCookies
      );
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };

  //return save pet
  const returnsavePet = async (id) => {
    try {
      const res = await axios.delete(
        `${baseUrl}/deletesavepet/?uId=${currentUser.uId}&petid=${id}`,
        objCookies
      );
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };

  //get user owned pets/saved
  const getPets = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/myPets/${currentUser.uId}`,
        objCookies
      );
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };

  //get all users
  const getUsers = async (page, perPage) => {
    try {
      const res = await axios.get(
        `${baseUrl}/getusers/?page=${page}&per_page=${perPage}`,
        objCookies
      );
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };

  //return pet
  const returnPet = async (id) => {
    try {
      const res = await axios.post(
        `${baseUrl}/returnPet/?uId=${currentUser.uId}&petid=${id}`,
        objCookies
      );
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };

  const value = {
    currentUser,
    signupUser,
    hendaleLogin,
    logOut,
    hendlaUpdate,
    getUser,
    userInfo,
    addPet,
    editPet,
    getPet,
    serach,
    adopteOrFoster,
    savePet,
    returnsavePet,
    getPets,
    returnPet,
    getUsers,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
