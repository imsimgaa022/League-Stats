import { Row, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChallangerQue } from "../../redux/actions";
import SingleSummonerData from "./SingleSummonerData";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const [selectedQue, setSelectedQue] = useState("RANKED_SOLO_5x5");
  const [page, setPage] = useState(1);
  const data = useSelector((state) => state.challangerQue);

  useEffect(() => {
    const payload = {
      que: selectedQue,
    };
    dispatch(getChallangerQue(payload));
  }, [selectedQue, dispatch]);

  const handleSelectChange = (value) => {
    setSelectedQue(value);
    setPage(1);
  };

  const selectOptions = [
    {
      value: "RANKED_SOLO_5x5",
      label: "Solo Que",
    },
    {
      value: "RANKED_FLEX_SR",
      label: "Flex",
    },
  ];

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
            <div style={{overflow: "scroll"}}>
              {data ? (
                <>
              <Row justify={"center"} style={{paddingTop:"2%", paddingBottom:"1%"}}>
                <Select
                  className="que-select"
                  style={{width:"200px", textAlign:"center"}}
                  defaultValue={selectedQue}
                  onChange={handleSelectChange}
                  options={selectOptions}
                />
              </Row>
              <Row justify={"center"}>
                <SingleSummonerData page={page} setPage={setPage} data={data} />
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
