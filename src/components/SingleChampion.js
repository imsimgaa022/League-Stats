import { Button, Carousel, Col, Empty, Progress, Row, Steps } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import { useSelector } from "react-redux";
import { ROLE_ICON } from "../helpers/renderRoleIcon";
import { ArrowUpOutlined } from "@ant-design/icons";

const SingleChampion = () => {
  const patchVersion = useSelector((state) => state.patchVersion);
  const params = useParams();
  const navigate = useNavigate();
  const [champion, setChampion] = useState(null);
  const [activeSpell, setActiveSpell] = useState(champion?.[0]?.spells?.[0]);
  const [activeDot, setActiveDot] = useState();
  const myRef = useRef(null);
  const { Step } = Steps;
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const carouselRef = useRef(null);
  const skinsRef = useRef(null);
  const location = useLocation();
  const [showIcon, setShowIcon] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleVideoError = () => {
    setHasError(true);
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 400;

      if (scrollPosition > threshold) {
        setShowIcon(true);
      } else {
        setShowIcon(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleSkinClick = (index) => {
    setActiveItemIndex(index);
    carouselRef.current.goTo(index);
  };

  useEffect(() => {
      if (location?.hash === '#skins') {
        const div = document.getElementById("skins");
        div?.scrollIntoView({ behavior: "smooth" });
      }
      // eslint-disable-next-line
  }, [champion]);

  const scrollToDiv = (id) => {
    const div = document.getElementById(id);
    div.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(()=> {
    setActiveSpell(champion?.[0]?.spells?.[0]);
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
    setHasError(false);
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

  const handleScrollToTop = () => {
    const div = document.getElementById("intro");
    div.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {champion && (
        <>
        <div style={{height: "calc(100vh - 57px)", overflowY: "auto"}}>
          {showIcon && (<ArrowUpOutlined style={{border: "1px solid purple", borderRadius: "50%", zIndex: "1000"}} onClick={handleScrollToTop} className="to-top"/>)}
          <Row justify="center" id="intro">
          <div>
          <Button className="champ-button" onClick={() => navigate("/champions")}>Champion list</Button>
          <Button style={{top: "120px"}} className="champ-button" onClick={() => scrollToDiv("about")}>About</Button>
          <Button style={{top: "160px"}} className="champ-button" onClick={() => scrollToDiv("skins")}>Skins</Button>
          </div>
            <div className="container-image" style={{ position: "relative", background: "black", width: "100%", flexDirection: "column" }}>
              <img
                alt="name"
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion[0].image?.full.replace('.png', '_0.jpg')}`}
                className="foreground-image"
              />
              <div className="container michroma-font color-white" style={{position: "absolute", bottom: "10%"}}>
                <h1 style={{color: "white"}}>{champion?.[0]?.name}</h1>
                <h2 style={{color: "white"}}>{champion?.[0]?.title}</h2>
              </div>
            </div>
          </Row>
          <Row id="about" style={{background:"#0b1624"}} justify="center">
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
            <div className="flex-center" style={{flexDirection: "column"}}>
              {ROLE_ICON[champion?.[0]?.tags?.[0]]}
              <p style={{textAlign: "center", color: "rgb(208, 168, 92)"}}>{champion?.[0]?.tags?.[0]}</p>
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
              <img style={{cursor:"pointer", margin:"0 auto"}} className={`${champion?.[0]?.passive?.["name"] === activeSpell?.["name"] && "active-spell"} spell-hover`} alt="spell" onClick={()=>handleSpellClick(champion?.[0]?.passive)} src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/passive/${champion?.[0]?.passive?.image?.full}`}/>
              {champion?.[0]?.spells?.map((spell, index)=>{
                return (
                    <img key={index} style={{cursor:"pointer", margin:"0 auto"}} className={`${spell?.["name"] === activeSpell?.["name"] && "active-spell"} spell-hover`} alt="spell" onClick={()=>handleSpellClick(spell)} src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${spell?.image?.full}`}/>
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
              <Col span={12} style={{ padding: "5%", paddingLeft: "0%" }}>
                {hasError ? (
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid gold", height: "450px", borderRadius: "50px 0px" }}>
                    <Empty className="no-video-desc" description={"No preview avaiable"} />
                  </div>
                ) : (
                  <div style={{ flex: 1, height: "450px" }}>
                    <video
                      style={{ height: "100%", borderRadius: "50px 0px", border: "1px solid gold", objectFit: "cover" }}
                      onError={handleVideoError}
                      muted
                      width="100%"
                      autoPlay
                      loop
                      controls={false}
                      src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${setKeyNumber(champion?.[0]?.key)}/ability_${setKeyNumber(champion?.[0]?.key)}_${formatAbility(activeDot)}1.webm`}
                    />
                  </div>
                )}
            </Col>
            </Row>
            <Row>
            </Row>
            {(champion?.[0]?.allytips?.length || champion?.[0]?.enemytips?.length) && (
            <Row style={{padding:"0% 4%"}}>
              <Col className="flex-center lore-desc" style={{flexDirection:"column", justifyContent:"start"}} span={12}>
              {!!champion?.[0]?.allytips?.length && (
                <>
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
                </>
              )}
              </Col>
              <Col className="flex-center lore-desc" style={{flexDirection:"column", justifyContent:"start"}} span={12}>
                {!!champion?.[0]?.enemytips?.length && (
                <>
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
                </>
                )}
              </Col>
            </Row>
            )}
          </Row>
          <Row justify="center" style={{padding:"2% 8%", background: "black"}} id="skins" ref={skinsRef}>
            <Col span={24}>
              <Carousel autoplay beforeChange={(oldIndex, newIndex) => setActiveItemIndex(newIndex)} ref={carouselRef} slide={activeItemIndex} effect="fade" style={{width: "100%"}}>
                {champion?.[0]?.skins?.slice(1)?.map((skin, ind) => {
                  return (
                    <>
                       <Row justify="center" key={ind}>
                          <div className="container-image" style={{ position: "relative", height: "85vh" }}>
                            <img
                              alt="name"
                              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion?.[0]?.id}_${skin?.num}.jpg`}
                              className="foreground-image"
                            />
                          </div>
                          <div
                            className="background-image"
                            style={{
                              background: `url("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion?.[0]?.id}_${skin?.num}.jpg")`}}
                          ></div>
                          <div className="container michroma-font color-white" style={{position:"absolute", bottom:"5%"}}>
                            <h2>{skin?.name}</h2>
                          </div>
                        </Row>
                    </>
                  )
                })}
              </Carousel>
              <div className="example">
                <h2 className="available-skins">Available Skins</h2>
                {champion?.[0]?.skins?.slice(1)?.map((skin, index) => {
                  return <>
                    <div key={index} onClick={() => handleSkinClick(index)} style={{margin: "1%", display: "flex", alignItems: "center", border: activeItemIndex === index && "1px solid rgba(193, 193, 193, 0.2)", borderRadius: "0px 50px"}}>
                      <img alt={skin?.name} style={{objectFit: "cover"}} height={activeItemIndex === index ? "100px" : "70px"} width={activeItemIndex === index ? "100px" : "70px"} src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion?.[0]?.id}_${skin?.num}.jpg`}/>
                      <p className="skin-text">{skin?.name}</p>
                    </div>
                  </>
                })}
              </div>
            </Col>
          </Row>
        </div>
        </>
      )}
    </>
  );
};

export default SingleChampion;
