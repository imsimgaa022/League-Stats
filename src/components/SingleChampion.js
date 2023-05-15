import { Button, Col, Progress, Row, Steps } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import { useSelector } from "react-redux";

const SingleChampion = () => {
  const patchVersion = useSelector((state) => state.patchVersion);
  const params = useParams();
  const navigate = useNavigate();
  const [champion, setChampion] = useState(null);
  const [activeSpell, setActiveSpell] = useState(champion?.[0]?.spells?.[0]);
  const [activeDot, setActiveDot] = useState();
  const myRef = useRef(null);
  const { Step } = Steps;

  useEffect(()=> {
    setActiveSpell(champion?.[0]?.spells?.[0]);
    // setActiveDot(champion?.[0]?.spells?.indexOf(activeSpell));
  }, [champion])


  useEffect(() => {
    fetch(
      `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion/${params?.id}.json`
    )
      .then((response) => response.json())
      .then((data) => setChampion(Object.values(data.data)));
  }, [params?.id, patchVersion]);

  const handleSpellClick = (spell) => {
    setActiveSpell(spell);
  }

  const createHtml =(description) => {
    let sanitizedHTML = DOMPurify.sanitize(description);
    let html = { __html: sanitizedHTML };
    return html;
  }

  useEffect(()=>{
    setActiveDot(champion?.[0]?.spells?.indexOf(activeSpell));
    // eslint-disable-next-line
  }, [activeSpell])

  const setKeyNumber = (key) => {
    let formatedKey;
    if (key < 100) {
      formatedKey = `00${key}`
    } else {
      formatedKey = `0${key}`
    }
    return formatedKey;
  }

  const formatAbility = (activSpell) => {
    let spellTag;
    switch(activeDot) {
      case -1:
        spellTag = "P"
        break;
      case 0:
        spellTag = "Q"
        break;
      case 1:
        spellTag = "W";
        break;
      case 2:
        spellTag = "E";
        break;
      case 3:
        spellTag = "R";
        break;
      default:
        break;
    }
    return spellTag;
  }

  return (
    <>
      {champion && (
        <>
          <Row justify="center">
          <Button className="champ-button" onClick={() => navigate("/home/champions")}>Champion list</Button>
            <div className="container-image" style={{ position: "relative" }}>
              <img
                alt="name"
                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion[0].image?.full.replace('.png', '_0.jpg')}`}
                className="foreground-image"
              />
            </div>
            <div
              className="background-image"
              style={{
                background: `url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion[0].image?.full.replace('.png', '_0.jpg')}")`}}
            ></div>
            <div className="container michroma-font color-white" style={{position:"absolute", bottom:"0%"}}>
              <h1 className="title">{champion?.[0]?.name}</h1>
              <h2 className="subtitle">{champion?.[0]?.title}</h2>
            </div>
          </Row>
          <Row style={{background:"#0b1624"}} justify="center">
            <Row style={{paddingTop:"4%"}}>
            <Col span={12} className="flex-center">
            <div>
              <Row style={{paddingBottom: "3%"}}>
                <Col span={12} className="flex-center lore-desc">Atack</Col>
                <Col><Progress className="progrress-size" showInfo={false} trailColor={"#0a3240"} strokeColor={"#08d6f6"} percent={champion?.[0]?.info?.attack * 11} steps={3} /> <br></br></Col>
              </Row>
              <Row style={{paddingBottom: "3%"}}>
                <Col span={12} className="flex-center lore-desc">Defense</Col>
                <Col className="flex-center"><Progress className="progrress-size" showInfo={false} trailColor={"#0a3240"} strokeColor={"#08d6f6"} percent={champion?.[0]?.info?.defense * 11} steps={3} /> <br></br></Col>
              </Row>
              <Row style={{paddingBottom: "3%"}}>
                <Col span={12} className="flex-center lore-desc">Magic</Col>
                <Col className="flex-center"><Progress className="progrress-size" showInfo={false} trailColor={"#0a3240"} strokeColor={"#08d6f6"} percent={champion?.[0]?.info?.magic * 11} steps={3} /> <br></br></Col>
              </Row>
              <Row style={{paddingBottom: "3%"}}>
                <Col span={12} className="flex-center lore-desc">Difficulty</Col>
                <Col className="flex-center"><Progress className="progrress-size" showInfo={false} trailColor={"#0a3240"} strokeColor={"#08d6f6"} percent={champion?.[0]?.info?.difficulty * 11} steps={3} /> <br></br></Col>
              </Row>
            </div>
            </Col>
            <Col style={{paddingRight:"15%", flexDirection:"column"}} span={12} className="color-white flex-center">
              <h3>Lore</h3>
              <p className="lore-desc">{champion?.[0]?.lore}</p>
            </Col>
            </Row>
            <Row style={{width:"100%", justifyContent:"center", paddingTop:"4%"}}>
              <Col span={12}><h2 className="color-white abilities-header">Abilities</h2>
              <div className="flex-center">
              <img style={{cursor:"pointer", margin:"0 auto"}} className={`${champion?.[0]?.passive?.["name"] === activeSpell?.["name"] && "active-spell"} spell-hover`} alt="spell" onClick={()=>handleSpellClick(champion?.[0]?.passive)} src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/passive/${champion?.[0]?.passive?.image?.full}`}/>
              {champion?.[0]?.spells?.map((spell, index)=>{
                return (
                    <img key={index} style={{cursor:"pointer", margin:"0 auto"}} className={`${spell?.["name"] === activeSpell?.["name"] && "active-spell"} spell-hover`} alt="spell" onClick={()=>handleSpellClick(spell)} src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${spell?.image?.full}`}/>
                )
              })}
              </div>
              <div>
                <Steps responsive={true} size="small" progressDot style={{marginTop:"10%"}}>
                  <Step status={activeDot === -1 ? "process" : "wait"}/>
                  <Step status={activeDot === 0 ? "process" : "wait"} />
                  <Step status={activeDot === 1 ? "process" : "wait"} />
                  <Step status={activeDot === 2 ? "process" : "wait"} />
                  <Step status={activeDot === 3 ? "process" : "wait"} />
                </Steps>
              </div>
              <Col span={24}>
              <div className="color-white" style={{paddingLeft:"7%", paddingRight:"25%"}}>
                <h6 className="color-white ability-short">{formatAbility(activeDot)}</h6>
                <h3 className="color-white ability-name test-ani">
                {activeSpell?.name}
                </h3>
                <p className="ability-desc test-ani" dangerouslySetInnerHTML={createHtml(activeSpell?.description)} ref={myRef}></p>
              </div>
              </Col>
              </Col>
              <Col span={12} style={{padding:"5%", paddingLeft:"0%"}}>
                <div style={{width:"100%", height:"100%"}}>
                  <video style={{border:"1px solid gold", borderRadius:"50px 0px 50px 0px"}} muted  width={"100%"} autoPlay loop controls={false} src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${setKeyNumber(champion?.[0]?.key)}/ability_${setKeyNumber(champion?.[0]?.key)}_${formatAbility(activeDot)}1.webm`}/>
                </div>
              </Col>
            </Row>
            <Row>
            </Row>
            <Row style={{padding:"0% 4%"}}>
              <Col className="flex-center lore-desc" style={{flexDirection:"column", justifyContent:"start"}} span={12}>
                <h3>Ally tips</h3>
                <ul className="lore-desc">
                  {champion?.[0]?.allytips?.map((tip, index)=>{
                    return (
                      <li key={index} className="lore-desc" style={{paddingBottom:"2%"}}>
                        {tip}
                      </li>
                    )
                  })}
                </ul>
              </Col>
              <Col className="flex-center lore-desc" style={{flexDirection:"column", justifyContent:"start"}} span={12}>
                <h3>Enemy tips</h3>
                <ul className="lore-desc">
                  {champion?.[0]?.enemytips?.map((tip, index)=>{
                    return (
                      <li key={index} className="lore-desc" style={{paddingBottom:"2%"}}>
                        {tip}
                      </li>
                    )
                  })}
                </ul>
              </Col>
            </Row>
          </Row>
        </>
      )}
    </>
  );
};

export default SingleChampion;
