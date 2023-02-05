import { Col, Row } from "antd";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPage = () => {
  const [initialPage, setInitialPage] = useState("login");

  const changeAuthState = () => {
    initialPage === "register" && setInitialPage("login");
    initialPage === "login" && setInitialPage("register");
  }

  return (
    <>
      <div style={{ height: "100vh" }}>
        <Row
          justify="space-between"
          style={{ height: "5vh", borderBottom: "1px solid purple" }}
        >
          <Col style={{ paddingLeft: "5%" }}>
            <img
              alt=""
              width={40}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/LoL_icon.svg/2048px-LoL_icon.svg.png"
            />
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              paddingRight: "5%",
            }}
          >
            {initialPage === "register" ? (
              <>
                <p>Already have an account? <span style={{color:"blue", cursor:"pointer"}} onClick={changeAuthState}>Log in!</span></p>
              </>
            ) : (
                <>
                <p>Don't have an account? <span style={{color:"blue", cursor:"pointer"}} onClick={changeAuthState}>Register here!</span></p>
                </>
            )}
          </Col>
        </Row>
        <Row style={{ height: "90vh", flexDirection: initialPage === "register" ? "row" : "row-reverse" }}>
          <Col span={12}>
            <img
              style={{ height: "100%", objectFit:"cover" }}
              width={"100%"}
              alt=""
              src="https://wallpaperwaifu.com/wp-content/uploads/2020/03/dark-star-jhin-league-of-legends-thumb.jpg"
            />
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            span={12}
          >
              {initialPage === "register" && <RegisterForm/> }
              {initialPage === "login" && <LoginForm/>}
          </Col>
        </Row>
        <Row
          style={{
            paddingRight: "5%",
            height: "5vh",
            borderTop: "1px solid purple",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Col style={{}}>Privacy polcy</Col>
        </Row>
      </div>
    </>
  );
};

export default AuthPage;
