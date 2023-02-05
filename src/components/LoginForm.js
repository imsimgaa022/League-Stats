import React from "react";
import { Button, Form, Input, Card, message } from "antd";
import { login } from "../Service";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  let navigate = useNavigate();

  const handleLogin = async (data) => {
    return await login(data)
      .then((data) => {
        let accessToken = data?.data?.accessToken;
        let userData = data?.data?.user;
        let profile = {
            username: userData?.username,
            summoner_name: userData.summoner_name,
            email: userData?.email,
            id: userData?.id
        }
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userData", JSON.stringify(profile));
      }).then(()=>{
          navigate(`/home/about`);
      })
      .catch((error) => {
        message.error(error.response.data);
      });
  };

  const onFinish = (values) => {
    handleLogin(values);
  };

  return (
    <>
      <Card style={{ width: "60%", border:"1px solid purple" }} className="hover-card">
        <Form style={{ color: "purple" }} layout="vertical" onFinish={onFinish}>
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
            label="Password"
            name="password"
            required
            rules={[
              {
                required: true,
                message: "Please enter your password!",
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
              Login
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default LoginForm;
