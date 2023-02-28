import React, { useState } from "react";
import { Button, Modal, Tabs } from "antd";
import { Outlet, useNavigate, useParams } from "react-router-dom";


const NavBar = () => {
  const [logoutModalVisible, setLogOutModalVisible] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    localStorage.clear();
    navigate("/");
  };
  let user = JSON.parse(localStorage.getItem("userData"));

  const onChange = (key) => {
    console.log(key)
      if (key == "about") {
        console.log("jest")
        navigate("/");
      } else {
        navigate(`/home/${key}`, {state:user});
      }
  };
  const items = [
    {
      key: "about",
      label: `About`,
    },
    {
      key: "summoner",
      label: `SUMMONER`,
    },
    {
      key: "champions",
      label: "Champions",
    },
    {
      key: "profile",
      label: "Profile",
    },
  ];
  return (
    <>
      <div id="navbar">
      <Modal
        visible={logoutModalVisible}
        okText="Log Out"
        onOk={handleLogOut}
        onCancel={() => setLogOutModalVisible(false)}
      >
        <div style={{ textAlign: "center", padding: "5%" }}>
          Are you sure you want to Log out?
        </div>
      </Modal>
        <Tabs
          onChange={onChange}
          className="custom-tabs michroma-font"
          style={{ marginBottom: "0px" }}
          tabBarGutter={120}
          centered
          size="large"
          defaultActiveKey="summoner"
          items={items}
        />
      </div>
      <Outlet/>
    </>
  );
};

export default NavBar;
