import React from "react";
import { Tabs } from "antd";
import { Outlet, useNavigate } from "react-router-dom";


const NavBar = () => {
  const navigate = useNavigate();

  const onChange = (key) => {
      if (key === "home") {
        navigate("/");
      } else {
        navigate(`/home/${key}`);
      }
  };
  const items = [
    {
      key: "home",
      label: `Home`,
    },
    {
      key: "summoner",
      label: `SUMMONER`,
    },
    {
      key: "champions",
      label: "Champions",
    },
  ];
  return (
    <>
      <div id="navbar">
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
