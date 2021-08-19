import React from "react";
import "../assets/css/chat.css";

import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

export default function chat() {
  return (
    <div className="chat__body">
      <div className="inner__body__container">
        <p className={`chat__message ${true && "chat__reciever"}`}>
          <span className="chat__name">Declan</span>
          Hey Guys
          <span className="chat__timestamp">3:52pm</span>
        </p>
      </div>
      <div className="inner__input__container">
        <input
          id="chatInputWindow"
          type="text"
          placeholder="input text plaese"
        />
        &nbsp;
        <SendOutlinedIcon />
      </div>
    </div>
  );
}
