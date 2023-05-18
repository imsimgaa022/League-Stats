import { Col, Empty, Row } from "antd";
import React from "react";
import { MostPlayedChamps } from "./MostPlayedChamps";

const PlayedChampsTab = ({mostPlayedChamps}) => {
  return (
      <>
      <Row justify={"center"}>
    <Col span={10}>
      <Row>
        <span style={{ color: "white" }} className="michroma-font subtitle">
          Most played Champions
        </span>
      </Row>
      {mostPlayedChamps?.length ? (
        mostPlayedChamps?.map((champ, index) => {
          return (
            <React.Fragment key={index}>
              <MostPlayedChamps
                champ={champ}
                index={index}
                mostPlayedChamps={mostPlayedChamps}
              />
            </React.Fragment>
          );
        })
      ) : (
        <Empty style={{ marginTop: "5%" }}></Empty>
      )}
    </Col>
    </Row>
    </>
  );
};

export default PlayedChampsTab;
