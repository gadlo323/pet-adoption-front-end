import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import jwt from "jwt-decode"; // import dependency
import { useHistory } from "react-router-dom";
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AutoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const baseUrl = "http://localhost:5000";

  //userActive
  const userActive = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const tokenRes = await axios.post(`${baseUrl}/user/tokenValid`, null, {
          headers: {
            authorization: "Bearer " + token,
          },
        });

        if (tokenRes.data) {
          const user = jwt(token);
          setCurrentUser(user);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  useEffect(() => {
    userActive();
    return () => userActive();
  }, []);

  //signUp
  const signupUser = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/signup`, data);
      localStorage.setItem("token", JSON.stringify(res.data));
      const user = jwt(res.data);
      setCurrentUser(user);
      return { error: 0, dataSevere: user };
    } catch (error) {
      return { error: 1, dataSevere: error.response.data };
    }
  };
  //login
  const hendaleLogin = async (formInfo) => {
    const token = JSON.parse(localStorage.getItem("token"));
    let config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    try {
      const res = await axios.post(`${baseUrl}/login`, formInfo, config);
      if (res.data) {
        localStorage.setItem("token", JSON.stringify(res.data));
        const user = jwt(res.data);
        setCurrentUser(user);
        return user;
      }
    } catch (error) {
      return false;
    }
  };

  //Logout

  const logOut = () => {
    localStorage.removeItem("token");
    setCurrentUser();
    history.push("/");
  };
  //update
  const hendlaUpdate = async (data, id) => {
    try {
      const res = await axios.patch(`${baseUrl}/user/${id}`, data);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };

  //getUser full
  const getUser = async (uId) => {
    try {
      const res = await axios.get(`${baseUrl}/userFull/${uId}`);
      const data = res.data;
      return data;
    } catch (err) {
      return err.response.data;
    }
  };
  //getUser basic info
  const userInfo = async (uId) => {
    try {
      const res = await axios.get(`${baseUrl}/user/${uId}`);
      const data = res.data;
      return data;
    } catch (err) {
      return err.response.data;
    }
  };

  //addPet to db
  const addPet = async (content) => {
    const token = JSON.parse(localStorage.getItem("token"));
    let config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    try {
      const res = await axios.post(`${baseUrl}/addpet`, content, config);
      if (res.data) {
        return res.data;
      }
    } catch (err) {
      return err.response.data;
    }
  };

  //edit Pet to db
  const editPet = async (content, id, cloudinary_id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    let config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    try {
      const res = await axios.patch(
        `${baseUrl}/editpet/?id=${id}&cloudId=${cloudinary_id}`,
        content,
        config
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
      const res = await axios.get(`${baseUrl}/pet/${id}`);
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
        { data: data, type: type }
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
        data
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
        `${baseUrl}/deletesavepet/?uId=${currentUser.uId}&petid=${id}`
      );
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };

  //get user owned pets/saved
  const getPets = async () => {
    try {
      const res = await axios.get(`${baseUrl}/myPets/${currentUser.uId}`);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };

  //get all users
  const getUsers = async (page, perPage) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let config = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const res = await axios.get(
        `${baseUrl}/getusers/?page=${page}&per_page=${perPage}`,
        config
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
        `${baseUrl}/returnPet/?uId=${currentUser.uId}&petid=${id}`
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
