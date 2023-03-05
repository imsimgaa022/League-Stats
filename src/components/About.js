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

  const handleFriendClick = (friend) => {
    localStorage.setItem("summoner_name", friend);
    navigate(`/home/summoner/${friend}`);
  }
  const creator = "Jhìntonic"
  const friends = ["top but not pedó", "kapazakameru", "Macbarbie0700", "Dr GLIDE man", "Aelius Maximus"]

  return (
    <>
      <div
        className="home-image flex-center"
        style={{
          height: "100vh",
          background: "url('/images/home/jhinHome.jpg')",
          backgroundSize: "cover",
          flexDirection:"column"
        }}
      >
        <div className="welcome-text" style={{paddingBottom:"5%"}}><h1>Welcome to League of Stats!</h1></div>
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
        <div>
        {/* <p style={{fontWeight:"bold"}} className="text-center michroma-font-white">Creator</p> */}
          <p onClick={() =>handleFriendClick(creator)} className="michroma-font-white friends-name" style={{margin:"1%", fontSize:"30px"}}>Jhìntonic</p>
        </div>
        <div style={{width:"100%"}}>
          {/* <p style={{fontWeight:"bold"}} className="text-center michroma-font-white">Teammates</p> */}
          <div style={{display:"flex", justifyContent:"center"}}>
            {friends.map((firend) => {
              return (
                <p onClick={() =>handleFriendClick(firend)} className="michroma-font-white friends-name" style={{margin:"1%"}}>{firend}</p>
              )
            })} 
          </div>
        </div>
       
      </div>
    </>
  );
};

export default About;
