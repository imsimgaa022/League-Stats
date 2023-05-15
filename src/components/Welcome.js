import { SearchOutlined } from "@ant-design/icons";
import { Form, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUserAction } from "../redux/actions";

const Welcome = () => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  const handleFinish = (values) => {
    if (!values?.summoner_name || values?.summoner_name?.length < 3) {
      message.error("Please enter at least 3 characters!", 3)
      return;
    }
    navigate(`/home/summoner/${values?.summoner_name}`);
  };

  useEffect(() => {
    dispatch(resetUserAction());
  }, [dispatch]);

  const redirect = (summoner) => {
    navigate(`/home/summoner/${summoner}`);
  };


  const handleFriendClick = (friend) => {
    redirect(friend);
  }
  const creator = "Jhìntonic"
  const friends = ["top but not pedó", "kapazakameru", "Macbarbie0700", "Dr GLIDE man", "Aelius Maximus", "Winstoner"]

  const handleModalCancel = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const hasVisitedPage = localStorage.getItem('hasVisitedPage');
    if (!hasVisitedPage) {
      setShowModal(true);
      localStorage.setItem('hasVisitedPage', true);
    }
  }, []);

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
        <Modal maskClosable={false} onCancel={handleModalCancel} footer={null} open={showModal}>
          <h1 className="welcome-modal-heading text-center">Hello and Welcome to my project!</h1>
          <p className="text-center">Please note that this site is still a work in progress, but I wanted to share my progress with you. I'm aware there are a lot of bugs but I'm actively working on it and will be adding new features and content regularly. Thank you for your patience and understanding, and I hope you enjoy exploring what's currently available.</p>
          <p>Quick tips:
            <ul>
              <li>App is made for searching League of Legends players and displaying their stats that are not avaiable in the game!</li>
              <li>Under search option there is list of my friends and my account (Jhìntonic) so you don't have to search for players, just click on them :)</li>
              <li>Right now there is only option for searching players on Europe Nordic and East Server!</li>
            </ul>
          </p>
          <p className="text-center">App is currently optimized for desktop use only and will not function optimally on mobile devices. For the best experience, please use app on a desktop device. </p>
          <h2 className="text-center">Miroslav</h2>
        </Modal>
        <div className="welcome-text" style={{paddingBottom:"5%"}}><h1>Welcome to League of Stats!</h1></div>
        <div className="search-box" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Form onFinish={handleFinish}>
            <Form.Item name="summoner_name">
            <input
              name="summoner_name"
              type="text"
              className="input-search"
              placeholder="Summoner name..."
            />
            </Form.Item>
            <button style={{top:"0"}} type="submit" className="btn-search" disabled={data?.isLoading}>
              <SearchOutlined/>
            </button>
          </Form>
        </div>
        <div>
          <p onClick={() =>handleFriendClick(creator)} className="michroma-font-white friends-name" style={{margin:"1%", fontSize:"30px"}}>Jhìntonic</p>
        </div>
        <div style={{width:"100%"}}>
          <div style={{display:"flex", justifyContent:"center"}}>
            {friends.map((firend, i) => {
              return (
                <p key={i} onClick={() =>handleFriendClick(firend)} className="michroma-font-white friends-name" style={{margin:"1%"}}>{firend}</p>
              )
            })} 
          </div>
        </div>
       
      </div>
    </>
  );
};

export default Welcome;
