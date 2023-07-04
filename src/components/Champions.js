import { Button, Col, Input, Pagination, Row, Tabs, Tour } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Champions = () => {
  const navigate = useNavigate();
  const patchVerions = useSelector((state) => state.patchVersion)
  const [paginatedReuslts, setPaingatedResults] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTag, setSearchTag] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: 'Search Champions',
      description: 'You can search champions by name here.',
      target: () => ref1.current,
    },
    {
      title: 'Champion Info',
      description: 'Clicking on Champion image will redirect you to Champion page, where you can see detailed info about that champion.',
      target: () => ref2.current,
    },
    {
      title: 'Tag Filter',
      description: 'By clicking on Champion Tag, you will search Champions with that specific Tag.',
      target: () => ref3.current,
    },
  ];

  let filteredItems = paginatedReuslts;

  if (searchTerm) {
    filteredItems = paginatedReuslts?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (searchTag?.length) {
    filteredItems = paginatedReuslts?.filter((item) => {
      for (const search of searchTag) {
        for (const array of item.tags) {
          if (array.includes(search)) {
            return true;
          }
        }
      }
      return false;
    });
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e) => {
    setSearchTag([]);
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredItems?.slice(startIndex, endIndex);

  useEffect(() => {
    fetch(
      `https://ddragon.leagueoflegends.com/cdn/${patchVerions}/data/en_US/champion.json`
    )
      .then((response) => response.json())
      .then((data) => setPaingatedResults(Object.values(data.data)))
  }, [patchVerions]);

  const handleClick = (key) => {
    navigate(`/champions/${key}`);
  };

  const handleTagClick = (value) => {
    setCurrentPage(1);
    if (searchTag.includes(value)) {
      setSearchTag(searchTag.filter((val) => val !== value));
    } else {
      setSearchTag([value]);
    }
  };

  const items = [
    {
      key: '',
      label: `All`,
    },
    {
      key: 'Fighter',
      label: `Fighter`,
    },
    {
      key: 'Mage',
      label: `Mage`,
    },
    {
      key: 'Support',
      label: `Support`,
    },
    {
      key: 'Tank',
      label: `Tank`,
    },
    {
      key: 'Marksman',
      label: "Marksman",
    },
    {
      key: 'Assassin',
      label: "Assassin",
    },
  ];

  const onChange = (key) => {
    handleTagClick(key)
  } 

  return (
    <>
      <div
        className="home-image"
        style={{
          paddingTop: "3%",
          minHeight: `100vh`,
          background:
            "url('/images/home/jhinHome.jpg')",
          backgroundSize:"cover"
        }}
      >
        {displayedItems && (
          <>
            <Button className="michroma-font highlight-btn" style={{margin: "0 auto", display:"flex", marginBottom:"2%", background:"purple"}} type="primary" onClick={() => setOpen(true)}>
              GUIDE
            </Button>
            <Tour className="tour-color" open={open} onClose={() => setOpen(false)} steps={steps} />
            <Row style={{background:"white", margin:"0% 3% 3% 3%"}}>
              <Col style={{padding:"0% 1%"}} className="flex-center" ref={ref1} span={3}>
                {!searchTag?.[0]?.length &&<Input prefix={<SearchOutlined/>} placeholder="Search" onChange={handleSearch}/>}
              </Col>
              <Col offset={4} ref={ref3}><Tabs className="custom-tabs michroma-font" defaultActiveKey="" items={items} onChange={onChange} /></Col>
            </Row>
            <Row>
              {displayedItems?.map((champion, index) => {
                return (
                  <Col
                    key={index}
                    className="michroma-font color-white image-animation"
                    span={4}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      paddingBottom: "2%",
                    }}
                  >
                    <img
                      loading="lazy"
                      style={{cursor:"pointer"}}
                      ref={index === 1 ? ref2 : null}
                      onClick={() => handleClick(champion?.image?.full.replace('.png', ''))}
                      width={"80%"}
                      alt={champion.name}
                      src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion?.image?.full.replace('.png', '_0.jpg')}`}
                    />
                    <div className="name-div" style={{width:"80%", background:"#071d25", position:"absolute", bottom:"5%"}}>
                      <p className="champ-name" style={{paddingLeft: "6%"}}>{champion.name}</p>
                    </div>
                  </Col>
                );
              })}
            </Row>
            <Row
              justify="center"
              style={{ marginTop: "2%", paddingBottom: "2%" }}
            >
              <Pagination
                className="custom-pagination"
                onChange={handlePageChange}
                defaultCurrent={1}
                current={currentPage}
                showSizeChanger={false}
                pageSize={30}
                total={filteredItems?.length}
              />
            </Row>
          </>
        )}
      </div>
    </>
  );
};

export default Champions;
