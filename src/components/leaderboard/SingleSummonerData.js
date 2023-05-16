import { Col, Pagination, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const SingleSummonerData = ({ data, page, setPage }) => {
  const navigate = useNavigate();
  const ResultsPerPage = 10;
  const sortedData = [...data].sort((a, b) => b.leaguePoints - a.leaguePoints);

  const indexOfLastResult = page * ResultsPerPage;
  const indexOfFirstResult = indexOfLastResult - ResultsPerPage;
  const currentResults = sortedData.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const resultsWithItemNumber = currentResults.map((result, index) => ({
    ...result,
    itemNumber: indexOfFirstResult + index + 1,
  }));

  const handleUserClick = (summoner) => {
    navigate(`/home/summoner/${summoner}`);
  };

  return (
    <div style={{width:"60%"}}>
        <Row className="challanger-table-head" style={{textAlign:"center"}}>
            <Col span={2}>#</Col>
            <Col span={8}>Summoner Name</Col>
            <Col span={4}>LP</Col>
            <Col span={6}>W / L</Col>
            <Col span={4}>Win Ratio</Col>
        </Row>
      {resultsWithItemNumber.map((result, index) => (
        <Row className="challanger-player" key={index} style={{textAlign:"center"}}>
            <Col span={2}>
                <p>{result.itemNumber}.</p>
            </Col>
            <Col span={8}>
              <p className="challanger-name-style" style={{cursor:"pointer"}} onClick={() => handleUserClick(result.summonerName)}>{result.summonerName}</p>
            </Col>
            <Col span={4}>
              <p style={{color:"#689ff1", fontWeight:"bold"}}>{result.leaguePoints}</p>
            </Col>
            <Col span={6}>
                <p><span style={{color:"#679d4e", fontWeight:"bold"}}>{result?.wins}</span> / <span style={{color:"#f37575", fontWeight:"bold"}}>{result?.losses}</span></p>
            </Col>
            <Col span={4}>
                <p>{Math.ceil((result?.wins / (result?.wins + result?.losses)) * 100)}%</p>
            </Col>
        </Row>
      ))}
      <Pagination
        style={{padding:"2%", display:"flex", justifyContent:"center"}}
        className="custom-pagination"
        current={page}
        total={sortedData.length}
        pageSize={ResultsPerPage}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default SingleSummonerData;
