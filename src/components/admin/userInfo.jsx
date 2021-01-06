import React, { useState, useEffect } from "react";
import NavLogged from "../loggedIn/navLogged";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import "./userInfo.css";

const UserInfo = (props) => {
  const userId = props.match.params.id;
  const { userInfo } = useAuth();
  const [userData, setUserData] = useState({});
  const [userPets, setUserPets] = useState([]);

  const info = async () => {
    const result = await userInfo(userId);
    setUserData(result.info);
    setUserPets(result.owned);
    // console.log(result);
  };

  useEffect(() => {
    info();
  }, []);

  return (
    <>
      <NavLogged />
      <section className="user-info">
        <div className="user-details">
          <div className="profile-card">
            <img src="../icon-man.png" alt="icon-profile" />
            <div className="row-user">
              <p>uId:{userData._id} </p>
              <p>First Name :{userData.first_name} </p>
              <p>Last Name :{userData.last_name} </p>
              <p>Email :{userData.email} </p>
              <p>Phone :{userData.phone} </p>
            </div>
          </div>
        </div>
        <div className="pets-list">
          {userPets.length === 0 && <h1>user not awned pets...</h1>}
          <ul className="owend-list">
            {userPets.map((item, index) => {
              return (
                <li className="pet-item" key={index}>
                  <div className="top">
                    <span>{item.name}</span>
                    <span>{item.breed}</span>
                  </div>
                  <div className="bootom">
                    <p>{item.status}</p>
                    <img className="pet-info-img" src={item.image_url} alt="" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default UserInfo;
