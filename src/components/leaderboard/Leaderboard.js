import { Row, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChallangerQue } from "../../redux/actions";
import { leagueOptions, regionOptions, selectOptions } from "./selectOptions";
import SingleSummonerData from "./SingleSummonerData";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const [selectedQue, setSelectedQue] = useState("RANKED_SOLO_5x5");
  const [selectedLeague, setSelectedLeague] = useState("challenger");
  const [selectedRegion, setSelectedRegion] = useState("EUNE");
  const [page, setPage] = useState(1);
  const data = useSelector((state) => state.challangerQue);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    const payload = {
      que: selectedQue,
      league: selectedLeague,
      region: selectedRegion
    };
    dispatch(getChallangerQue(payload));
  }, [selectedQue, dispatch, selectedLeague, selectedRegion]);

  const handleSelectChange = (value) => {
    setSelectedQue(value);
    setPage(1);
  };

  const handleLeagueChange = (value) => {
    setSelectedLeague(value);
    setPage(1);
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    setPage(1);
  };

  return (
    <>
          <div
            className="home-image"
            style={{
              minHeight: "calc(100vh - 57px)",
              background: "url('/images/home/jhinHome.jpg')",
              backgroundSize: "cover",
            }}
          >
            <div >
              {data && !isLoading ? (
                <>
              <Row justify={"center"} style={{paddingTop:"2%", paddingBottom:"1%"}}>
                <Select
                  className="que-select"
                  style={{width:"230px", textAlign:"center", marginRight:"2%"}}
                  defaultValue={selectedQue}
                  onChange={handleSelectChange}
                  options={selectOptions}
                  size="large"
                />
                <Select
                  className="que-select"
                  style={{width:"230px", textAlign:"center", marginLeft:"2%", marginRight: "2%"}}
                  defaultValue={selectedLeague}
                  onChange={handleLeagueChange}
                  options={leagueOptions}
                  size="large"
                />
                <Select
                  className="que-select"
                  style={{width:"230px", textAlign:"center", marginLeft:"2%"}}
                  defaultValue={selectedRegion}
                  onChange={handleRegionChange}
                  options={regionOptions}
                  size="large"
                />
              </Row>
              <Row justify={"center"}>
                <SingleSummonerData region={selectedRegion} page={page} setPage={setPage} data={data} />
              </Row>
              </>
              ) : (
                <Row style={{minHeight: "calc(100vh - 57px)"}} justify={"center"} align="middle">
                  <Spin size="large" spinning={true}/>
                </Row>
              )}
            </div>
          </div>
  </>
  );
};

export default Leaderboard;
