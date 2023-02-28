import { SearchOutlined } from "@ant-design/icons";
import { Form } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  let navigate = useNavigate();

  const handleFinish = (values) => {
    console.log(values);
    localStorage.setItem("summoner_name", values?.summoner_name);
    navigate(`/home/summoner/${values?.summoner_name}`);
  }

  return (
    <>
      <div
        className="home-image flex-center"
        style={{
          height: "100vh",
          background: "url('/images/home/jhinHome.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div class="search-box">
          <Form onFinish={handleFinish}>
            <Form.Item name="summoner_name">
            <input
              name="summoner_name"
              type="text"
              class="input-search"
              placeholder="Summoner name..."
            />
            </Form.Item>
            <button style={{top:"0"}} type="submit" class="btn-search">
              <SearchOutlined/>
            </button>
          </Form>
        </div>
      </div>
      <div className="block"></div>
    </>
  );
};

export default About;
