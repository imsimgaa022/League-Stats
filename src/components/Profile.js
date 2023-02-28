import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import { updateProfile } from "../Service";

const Profile = () => {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
  const user = location?.state;
  console.log(user);

  const handleFinish = (values) => {
    const updatedUser = {
      username: values?.username,
      email: values?.email,
      password: values?.password,
      summoner_name: values?.summoner_name
    }

    fetch(`http://localhost:3000/users/${user?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(data => localStorage.setItem("userData", JSON.stringify(data)))
    .then(localStorage.removeItem("games"))
    .catch(error => console.error(error))
  }

  const initialValues = {
    username: user?.username,
    email: user?.email,
    summoner_name: user?.summoner_name,
  }

  return (
    <>
      <div
        style={{
          height: "calc(100vh - 57px)",
          background:
            "url('https://preview.redd.it/in73r6sbixz31.png?width=4096&format=png&auto=webp&s=810fa4aef8f17b2ccf3ca4c18601eb731904d37e')",
          backgroundSize: "cover",
        }}
      >
        <Row style={{height:"100%"}}>
          <Col span={12} style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <div>
              <h1>
                Welcome back{" "}
                <span className="mt-0" style={{ color: "purple" }}>
                  {user?.username}!
                </span>
              </h1>
              <h2>
                Also know as{" "}
                <span style={{ color: "purple" }}>{user?.summoner_name}</span>
              </h2>
            </div>
          </Col>
          <Col span={12} className="flex-center">
            <Form initialValues={initialValues} onFinish={handleFinish}>
              <Form.Item name="username">
                <Input placeholder="Username"/>
              </Form.Item>
              <Form.Item name="email">
                <Input placeholder="email"/>
              </Form.Item>
              <Form.Item name="summoner_name">
                <Input placeholder="Summoner Name"/>
              </Form.Item>
              <Form.Item required name="password">
                <Input required type="password" placeholder="password"/>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Profile;
