import { Modal } from "antd";
import React from "react";

const WelcomeModal = ({showModal, handleModalCancel}) => {
  return (
    <Modal
      maskClosable={false}
      onCancel={handleModalCancel}
      footer={null}
      open={showModal}
    >
      <h1 className="text-center">
        Hello and Welcome to my project!
      </h1>
      <p className="text-center">
        Please note that this site is still a work in progress, but I wanted to
        share my progress with you. I'm aware there are a lot of bugs but I'm
        actively working on it and will be adding new features and content
        regularly. Thank you for your patience and understanding, and I hope you
        enjoy exploring what's currently available.
      </p>
      <p>
        Quick tips:
        <ul>
          <li>
            App is made for searching League of Legends players and displaying
            their stats that are not avaiable in the game!
          </li>
          <li>
            Under search option there is list of my friends and my account
            (Jhìntonic) so you don't have to search for players, just click on
            them :)
          </li>
          <li>
            Right now there is only option for searching players on Europe
            Nordic and East Server!
          </li>
        </ul>
      </p>
      <p className="text-center">
        App is currently optimized for desktop use only and will not function
        optimally on mobile devices. For the best experience, please use app on
        a desktop device.{" "}
      </p>
      <h2 className="text-center">Miroslav</h2>
    </Modal>
  );
};

export default WelcomeModal;
