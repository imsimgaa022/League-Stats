import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { Outlet, useNavigate, useParams } from "react-router-dom";


const NavBar = () => {
  const params = useParams();
  const navigate = useNavigate();
  const summoner_name = localStorage.getItem('summoner_name');
  const [activeKey, setActiveKey] = useState();
  const onChange = (key) => {
    if (key === "home") {
      navigate("/");
    } else if (key === "summoner") {
      setActiveKey("summoner")
      navigate(`/home/${key}/${summoner_name}`);
    } else if (key === "leaderboard") {
      setActiveKey("leaderboard")
      navigate(`/home/${key}`)
    } else {
      navigate(`/home/${key}`);
      setActiveKey("champions")
    }
  };

  useEffect(() => {
    params?.name && setActiveKey("summoner")
    params?.id && setActiveKey("champions")
  }, [params])

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
      key: "leaderboard",
      label: "Leaderboard"
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
          activeKey={activeKey}
          items={items}
        />
      </div>
      <Outlet/>
    </>
  );
};

export default NavBar;
