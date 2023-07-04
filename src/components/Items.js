import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Input, Row, Spin, Tag } from "antd";
import { getItemData } from "../redux/actions";
import { Tree, TreeNode } from 'react-organizational-chart';
import { TAG_TO_COLOR } from "../helpers/itemTagColor";

const Items = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const dataIsLoading = useSelector((state) => state.isLoading);
  const patchVersion = useSelector((state) => state.patchVersion);
  const [selectedItemId, setSelectedItemId] = useState("3078");
  const [item, setItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilteredItems, setSearchFilteredItems] = useState(null);

  useEffect(() => {
    const payload = {
      patchVersion: patchVersion
    }
    patchVersion && dispatch(getItemData(payload));
  }, [dispatch, patchVersion]);

  const handleClick = (key, obj) => {
    setSelectedItemId(key);
  };

  useEffect(() => {
    items && setItem(items[selectedItemId]);
  }, [selectedItemId, items, dataIsLoading]);

  const renderDescription = (item) => {
    return {__html: item?.description};
  };

  const handleSearch = (e) => {
    if (!e?.target?.value) {
      setSearchTerm("")
    }
    setSearchTerm(e.target.value?.toLowerCase());
  };

  useEffect(() => {
    if (!items) return;
    const filteredItems = Object?.values(items)?.filter((item) => item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    setSearchFilteredItems(filteredItems);
    // eslint-disable-next-line
  }, [searchTerm]);


  return (
    dataIsLoading ? (
      <Row className="home-image" style={{background: "url('/images/home/itemsBg.jpeg')", backgroundSize: "cover", height: "calc(100vh - 57px)"}}>
        <Col span={24} className="flex-center">
          <Spin size="large"/>
        </Col>
      </Row>
    ) : (
    <>
      <>
      <Row className="home-image" style={{background: "url('/images/home/itemsBg.jpeg')", backgroundSize: "cover"}}>
        <Col className="section" span={10} style={{height: "calc(100vh - 57px)", overflowY: "auto"}}>
          <div style={{marginTop: "10%"}}>
            { item && (
              <>
              <Row style={{marginBottom: "3%"}}>
                <Col span={24}>
                  <Input onChange={handleSearch} placeholder="Search items..."/>
                </Col>
              </Row>
              <Row>
              {searchTerm ? (
                searchFilteredItems?.map((item) => {
                  let itemKey = item?.image?.full?.split(".")?.[0]
                  return (
                    <Col key={itemKey} span={4} className="d-flex flex-center">
                    <img
                        loading="lazy"
                        alt=""
                        key={itemKey}
                        onClick={() => handleClick(itemKey)}
                        className={selectedItemId === itemKey ? "selected" : ""}
                        style={{width: "50%", margin: "5% 0%", borderRadius: "15%"}}
                        src={ !!item?.requiredAlly ? `https://static.bigbrain.gg/assets/lol/ornn_items/${itemKey}.webp` : `http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${itemKey}.png`}
                      />
                    </Col>
                  )
                })
              ) : (
                <>
                {Object.entries(items).map(([key, obj]) => (
                  <Col key={key} span={4} className="d-flex flex-center">
                    <img
                      loading="lazy"
                      alt=""
                      key={key}
                      onClick={() => handleClick(key, obj)}
                      className={selectedItemId === key ? "selected" : ""}
                      style={{width: "50%", margin: "5% 0%", borderRadius: "15%", cursor: selectedItemId === key ? "not-allowed" : "pointer"}}
                      src={ !!obj?.requiredAlly ? `https://static.bigbrain.gg/assets/lol/ornn_items/${key}.webp` : `http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${key}.png`}
                    />
                  </Col>
                ))}
                </>
              )}
              </Row>
              </>
            )}
          </div>
        </Col>
        <Col span={14} style={{maxHeight: "calc(100vh - 57px)", overflowY: "auto"}}>
          <div style={{ flexDirection: "column" }}>
            <>  
            <div style={{color:"white", paddingLeft: "2%"}}>
              <h2 style={{textDecoration: "underline"}}>Builds into</h2>
            </div>
              <div style={{ display: "flex", overflowX: "auto", marginBottom: "5%", width: "90%", marginLeft:"2%"}}>
                  {Array.from({ length: item?.into?.length >= 12 ? item?.into?.length : 12 }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    margin: "2% 1%",
                    minWidth: "50px",
                    height: "50px",
                    border: "1px solid white",
                    borderRadius: "12%"
                  }}
                >
                  {item?.into && index < item.into.length && (
                    <img
                      width={"46px"}
                      height={"46px"}
                      onClick={() => handleClick(item.into[index], item)}
                      src={ !!items[item?.into[index]]?.requiredAlly ? `https://static.bigbrain.gg/assets/lol/ornn_items/${item?.into[index]}.webp` : `http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${item.into[index]}.png`}
                      loading="lazy"
                      alt=""
                      style={{ borderRadius: "10%", cursor: "pointer" }}
                    />
                  )}
                </div>
              ))}
                </div>
              </>
            <Tree
              lineWidth={'2px'}
              lineColor={'white'}
              lineHeight={'15px'}
              nodePadding={"30px"}
              lineBorderRadius={'5px'}
              label={
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <img
                    width={65}
                    alt=""
                    src={ !!item?.requiredAlly ? `https://static.bigbrain.gg/assets/lol/ornn_items/${item?.image?.full?.split('.')?.[0]}.webp` :  `http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${item?.image?.full}`}
                    style={{border: "2px solid red", borderRadius: "10%"}}
                  />
                  {!!item?.gold?.total && <p style={{color: "white", marginBottom: "0px"}}>
                    {item?.gold?.total}
                  </p>}
                </div>
              }
            >
              {item?.from?.length && (
                <div style={{display: "flex", width: "100%"}}>
                {item?.from?.map((id, ind) => {
                  return (
                    <TreeNode key={ind} label={
                    <>
                    <div style={{flexDirection: "column", display: "flex", alignItems: "center", width: "100%"}}>
                        <img
                          width={50}
                          alt=""
                          style={{borderRadius: "10%", border: "1px solid white", cursor: "pointer"}}
                          onClick={() => handleClick(id)}
                          src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${id}.png`}
                        />
                        <p style={{color: "white", marginBottom: "5px"}}>
                          {items[id]?.gold?.total}
                        </p>
                        {items[id]?.from?.length && (
                        <TreeNode>
                        <div style={{display: "flex", width: "100%", justifyContent: "space-around"}}>
                          {items[id]?.from?.map((item, ind) => {
                            return (
                              <TreeNode key={ind}>
                              <>
                              <div>
                                <img
                                  width={50}
                                  alt=""
                                  style={{borderRadius: "10%", border: "1px solid white", cursor: "pointer"}}
                                  onClick={() => handleClick(item)}
                                  src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${item}.png`}
                                />
                                <p style={{color: "white"}}>
                                  {items[item]?.gold?.base}
                                </p>
                              </div>
                              </>
                              </TreeNode>
                            )
                          })}
                        </div>
                        </TreeNode>
                        )}
                      </div>
                    </>
                    }>
                    </TreeNode>
                  );
                })}
                </div>

              )}
            </Tree>
            </div>
            <Row style={{borderTop: "1px solid white", borderBottom: "1px solid white", margin: "0% 3%", alignItems: "center", padding: "2% 0%", marginTop: "3%", marginBottom: "3%"}}>
              <Col span={3}>
                <img alt="" style={{borderRadius: "5%", border: "1px solid gray"}} src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${item?.image?.full}`}/>
              </Col>
              <Col span={10}>
                <div style={{color: "white"}} className="michroma-font">
                  <h3 style={{marginBottom: "0", marginTop: "0"}}>{item?.name}</h3>
                  {!!item?.gold?.total && <p style={{marginTop: "0", color: "gold"}}>{item?.gold?.total}</p>}
                </div>
              </Col>
              <Col span={11}>
                <div className="section" style={{ overflowY: "auto"}}>
                {item?.tags?.map((tag, ind) => {
                  return <Tag className="michroma-font" key={ind} bordered="True" color={TAG_TO_COLOR[tag]} style={{margin: "2% 3%", textAlign: "center", borderRadius: "5px 5px 5px 5px"}}>{tag}</Tag>
                })}
                </div>
              </Col>
              <Col span={24} style={{marginTop: "1%"}}>
                <div className="michroma-font" style={{color: "white", lineHeight: "25px"}} dangerouslySetInnerHTML={renderDescription(item)} />
              </Col>
            </Row>
        </Col>
      </Row>
      </>
      </>
      
    )
  );
};

export default Items;
