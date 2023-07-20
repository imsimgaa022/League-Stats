import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, message, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUserAction } from "../redux/actions";
import WelcomeModal from "./modals/WelcomeModal";
import { regionOptions } from "./leaderboard/selectOptions";
import WhatIsNewModal from "./modals/WhatIsNewModal";

const Welcome = () => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [region, setRegion] = useState("EUNE");
  const [recentSearch, setRecentSearch] = useState([]);
  const [newModalVisible, setNewModalVisible] = useState(false);

  useEffect(() => {
    const storedSearchHistory = localStorage.getItem('recentSearch');
    if (storedSearchHistory) {
      setRecentSearch(JSON.parse(storedSearchHistory));
    }
  }, []);

  const handleFinish = (values) => {
    if (!values?.summoner_name || values?.summoner_name?.length < 3) {
      message.error("Please enter at least 3 characters!", 3)
      return;
    }

    const existingItem = recentSearch.find(
      (item) =>
        item.summoner === values.summoner_name && item.region === region
    );

    if (!existingItem) {
      const updatedSearchHistory = [...recentSearch, { region, summoner: values?.summoner_name }];
      setRecentSearch(updatedSearchHistory);
      localStorage.setItem('recentSearch', JSON.stringify(updatedSearchHistory));
    }

    navigate(`/summoner/${values?.summoner_name}/${region}`);
  };

  useEffect(() => {
    dispatch(resetUserAction());
  }, [dispatch]);

  const redirect = (summoner) => {
    navigate(`/summoner/${summoner}/EUNE`);
  };


  const handleFriendClick = (friend) => {
    redirect(friend);
  }
  const creator = "Jhìntonic"
  const friends = ["top but not pedó", "kapazakameru", "Macbarbie0700", "Dr GLIDE man", "Aelius Maximus", "Winstoner"]

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const hadnleNewModalOpen = () => {
    setNewModalVisible(!newModalVisible);
  };

  useEffect(() => {
    const hasVisitedPage = localStorage.getItem('hasVisitedPage');
    if (!hasVisitedPage) {
      setShowModal(true);
      localStorage.setItem('hasVisitedPage', true);
    }
    localStorage.removeItem('summoner_name');
  }, []);

  const handleRegionChange = (value) => {
    setRegion(value)
  };

  const handleRecenSearch = (user) => {
    navigate(`/summoner/${user?.summoner}/${user?.region}`);
  };

  const removeItem = (itemToRemove) => {
    const updatedSearchHistory = recentSearch.filter((item) => {
      return !(item.summoner === itemToRemove.summoner && item.region === itemToRemove.region);
    });
    setRecentSearch(updatedSearchHistory);
    localStorage.setItem('recentSearch', JSON.stringify(updatedSearchHistory));
  };

  return (
    <>
      <div
        className="black-shadow flex-center"
        style={{
          height: "calc(100vh - 57px)",
          background: "url('/images/home/newBg.jpeg')",
          backgroundSize: "cover",
          flexDirection:"column"
        }}
      >
        <Button onClick={hadnleNewModalOpen} style={{position: "absolute", top: "80px", left: "30px"}} className="michroma-font highlight-btn">What is new?</Button>
        <WhatIsNewModal newModalVisible={newModalVisible} handleCancel={hadnleNewModalOpen}/>
        <WelcomeModal showModal={showModal} handleModalCancel={handleModalCancel}/>
        <div className="welcome-text" style={{paddingBottom:"5%"}}><h1>Welcome to League of Stats!</h1></div>
        <div style={{marginBottom: "1%"}}>
          <p className="text-center" style={{color: "white"}}>Region</p>
          <Select size="large" className="region-select" defaultValue="EUNE" style={{width:"230px", textAlign:"center"}} options={regionOptions} onChange={handleRegionChange}/>
        </div>
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
        {!!recentSearch?.length && (
        <>
          <div style={{color: "white", marginBottom: "1%"}}>Recent Search</div>
          <div style={{width: "100%", display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
            {recentSearch?.map((item) => {
              return (
                <Tag color={"white"} style={{padding: "0.5%", borderRadius: "10px", cursor: "pointer", marginBottom: "0.5%"}}>
                  <Tag onClick={() => handleRecenSearch(item)} color={"black"}>{item?.region}</Tag>
                  <b style={{color:"black"}} onClick={() => handleRecenSearch(item)}>{item?.summoner}</b>
                  <CloseOutlined onClick={() => removeItem(item)} style={{paddingLeft:"3%", fontSize: "14px"}}/>
                </Tag>
              )
            })}
          </div>
        </>
        )}
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
