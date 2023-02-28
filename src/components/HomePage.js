import React, { useState } from "react";
import { Button, Modal, Tabs } from "antd";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import About from "./About";
import SummonerInfo from "./SummonerInfo";

const HomePage = () => {
  const [logoutModalVisible, setLogOutModalVisible] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    navigate("/");
  };
  let user = JSON.parse(localStorage.getItem("userData"));
  const items = [
    {
      key: "profile",
      label: "Profile",
      children: <Profile user={user} />,
    },
    {
      key: "summoner",
      label: `SUMMONER`,
      children: <SummonerInfo user={user}/>,
    },
    {
      key: "about",
      label: `About`,
      children: <About />,
    },
  ];
  return (
    <>
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
      <div style={{ height: "100vh" }}>
        <Tabs
            className="custom-tabs"
          style={{ marginBottom: "0px" }}
          tabBarGutter={120}
          tabBarExtraContent={
            <Button
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
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </>
  );
};

export default HomePage;
