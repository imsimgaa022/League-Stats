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
    } else {
      navigate(`/home/${key}`);
      setActiveKey("champions")
    }
  };

  useEffect(() => {
    setActiveKey(params?.name ? "summoner" : "champions");
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
