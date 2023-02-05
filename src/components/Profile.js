import { Col, Row } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const user = location?.state;
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
          <Col span={12}></Col>
        </Row>
      </div>
    </>
  );
};

export default Profile;
