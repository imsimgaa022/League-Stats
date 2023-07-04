import { Modal } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const WhatIsNewModal = ({handleCancel, newModalVisible}) => {
  const navigate = useNavigate();

  const navigateToJhin = () => {
    navigate(`/champions/Jhin#skins`);
  };

  return (
    <Modal
      maskClosable={false}
      footer={null}
      open={newModalVisible}
      onCancel={handleCancel}
    >
     <div style={{fontFamily: "Michroma"}}>
       <h2 style={{textAlign: "center"}}>New Features</h2>
       <h4>Region Selection!</h4>
       <ul style={{fontStyle: "italic"}}>
         <li><p>Right now you have option to select and search player on multiple Regions!</p></li>
         <li><p>Players you've searched will be displayed under search bar!</p></li>
         <li><p>Leaderboard region selection as well!</p></li>
       </ul>
       
       <h4>Items Page!</h4>
       <ul style={{fontStyle: "italic"}}>
         <li><p>On new items page you have option to list all items in game for latest patch!</p></li>
         <li><p>When you select item on right side you will see how it's built, it's price and description!</p></li>
       </ul>
       <h4>Champion Skins!</h4>
       <ul style={{fontStyle: "italic"}}>
         <li><p>On Champions Page, after you select Champion you'll be able to see all skins for that champion!</p></li>
       </ul>
       <p onClick={navigateToJhin} style={{textAlign: "center", cursor: "pointer", color: "blue", textDecoration: "underline"}}>Example</p>
     </div>
    </Modal>
  )
}

export default WhatIsNewModal