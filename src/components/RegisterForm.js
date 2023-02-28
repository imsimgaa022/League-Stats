import React, { useEffect } from "react";
import { Button, Form, Input, Card, message } from "antd";
import { register } from "../Service";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  let navigate = useNavigate();


  const handleRegister = async (data) => {
    return await register(data)
      .then((data) => {
        let accessToken = data?.accessToken;
        let userData = data?.data?.user;
        let profile = {
          username: userData?.username,
          summoner_name: userData.summoner_name,
          email: userData?.email,
          id: userData?.id,
        };
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userData", JSON.stringify(profile));
      })
      .then(() => {
        navigate("/home/about");
      })
      .catch((error) => {
        message.error(error.response.data);
      });
  };

  const onFinish = (values) => {
    handleRegister(values);
  };

  let usernameRules = () => {
    return [
      {
        max: 20,
        message: "Maximum 20 characters",
      },
      {
        whitespace: true,
        message: "Please enter username",
      },
      {
        required: true,
        message: "Please enter username",
      },
    ];
  };

  return (
    <>
      <Card style={{ width: "60%", border:"1px solid purple" }} className="hover-card">
        <Form style={{ color: "purple" }} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Username" name="username" rules={usernameRules()}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Summoner Name"
            name="summoner_name"
            rules={[
              {
                required: true,
                message: "Please enter your Summoner Name!",
                min: 3,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            required
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{ backgroundColor: "purple", width: "100%" }}
              type="primary"
              htmlType="submit"
              required
            >
              Register
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default RegisterForm;
