import React, { useState } from "react";
import { message, Modal, Tabs } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";


const NavBar = () => {
  const navigate = useNavigate();
  const summoner_name = localStorage.getItem('summoner_name');
  const location = useLocation();
  const region = localStorage?.getItem("region");
  const user = useAuth();
  const [logOutModalVisible, setLogOutModalVisible] = useState(false);
  const dispatch = useDispatch();

  const onChange = (key) => {
    if (key === "home") {
      localStorage.removeItem('summoner_name');
      navigate("/");
    } else if (key === "summoner") {
      navigate(`/${key}/${summoner_name}/${region}`);
    } else if (key === "leaderboard") {
      navigate(`/${key}`)
    } else if (key === "items") {
      navigate(`/${key}`)
    } else if(key === "logout") {
      setLogOutModalVisible(true)
    }
    else {
      navigate(`/${key}`);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOGOUT_USER' });
    setLogOutModalVisible(false);
    message.info("Goodbye!", 2)
  };

  const items = [
    {
      key: "home",
      label: `Home`,
    },
    user && {
      key: "summoner",
      label: `SUMMONER`,
      disabled: !localStorage?.getItem("summoner_name")
    },
    user && {
      key: "leaderboard",
      label: "Leaderboard"
    },
    user && {
      key: "items",
      label: "Items"
    },
    user && {
      key: "champions",
      label: "Champions",
    },
    user && {
      key: "logout",
      label: "Logout",
    },
    !user && {
      key: "login",
      label: "Login",
    },
    !user && {
      key: "register",
      label: "Register",
    },
  ];
  return (
    <>
      <div id="navbar">
        <Tabs
          onChange={onChange}
          className="custom-tabs michroma-font"
          style={{ marginBottom: "0px", background: "black" }}
          tabBarGutter={60}
          centered
          size="large"
          activeKey={location?.pathname?.split("/")?.[1] || "home"}
          items={items}
        />
      </div>
      <Modal okText={"Yes"} open={logOutModalVisible} onCancel={() => setLogOutModalVisible(false)} onOk={handleLogOut}>
        <h2 className="michroma-font" style={{textAlign: "center"}}>Are you sure you want to log out?</h2>
      </Modal>
      <Outlet/>
    </>
  );
};

export default NavBar;
