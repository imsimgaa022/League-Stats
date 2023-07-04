import React from "react";
import { Tabs } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";


const NavBar = () => {
  const navigate = useNavigate();
  const summoner_name = localStorage.getItem('summoner_name');
  const location = useLocation();
  const region = localStorage?.getItem("region");

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
    } else {
      navigate(`/${key}`);
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
      disabled: !localStorage?.getItem("summoner_name")
    },
    {
      key: "leaderboard",
      label: "Leaderboard"
    },
    {
      key: "items",
      label: "Items"
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
          tabBarGutter={60}
          centered
          size="large"
          activeKey={location?.pathname?.split("/")?.[1] || "home"}
          items={items}
        />
      </div>
      <Outlet/>
    </>
  );
};

export default NavBar;
