import React, { useState } from "react";
import { Button, Modal, Tabs } from "antd";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [logoutModalVisible, setLogOutModalVisible] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    navigate("/");
  };
  let user = JSON.parse(localStorage.getItem("userData"));
//   console.log("navbar user", user)

  const onChange = (key) => {
      console.log(key)
      navigate(`/home/${key}`, {state:user});
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
          tabBarExtraContent={
            <Button
              className="michroma-font"
              onClick={() => setLogOutModalVisible(true)}
              style={{
                marginRight: "10px",
                backgroundColor: "purple",
                color: "white",
              }}
            >
              Log Out
            </Button>
          }
          centered
          size="large"
          defaultActiveKey="about"
          items={items}
        />
      </div>
    </>
  );
};

export default NavBar;
