import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import useRouter from "../utils/use-router";

import "../assets/css/mainpage.css";

import { Button } from "@material-ui/core";
import GoogleLoginForm from "../components/googleLoginForm";
import { userLogIn } from "../reducer/actions/user";
import { channelEnter } from "../reducer/actions/channel";
import { setDeviceList } from "../reducer/actions/deviceList";

/* Icons */
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import QueueIcon from "@material-ui/icons/Queue";

import AgoraRTC from "agora-rtc-sdk-ng";

export default function SignIn() {
  const routerCtx = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    AgoraRTC.getDevices().then((devices) => {
      dispatch(setDeviceList(devices));
    });
  }, []);

  const [channelName, setChannelName] = useState("");
  const [userName, setUserName] = useState("");

  const onChanelName = useCallback(
    (e) => {
      e.preventDefault();

      setChannelName(e.currentTarget.value);
    },
    [channelName]
  );

  const onUserName = useCallback(
    (e) => {
      e.preventDefault();

      setUserName(e.currentTarget.value);
    },
    [userName]
  );

  const onEnterChanel = useCallback(
    (e) => {
      dispatch(userLogIn(userName));
      dispatch(channelEnter(channelName));

      routerCtx.history.push({ pathname: `/meeting` });
    },
    [userName, channelName]
  );

  return (
    <div className="container">
      <div className="row_container">
        <div className="inline_container">
          <div className="logo"></div>

          <div id="title_copyright">
            <p>
              Hyper Augmented Omni <br />
              Communication Chnnel_OWAKE
            </p>
          </div>

          <div className="btn_container">
            <div className="left_image_container">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/09/09/17/girl-1245713__340.jpg"
                alt=""
                style={{ width: "300px" }}
              />
            </div>
            <div className="right_btn_container">
              <div id="Name_Your_Channel">
                <input
                  id="Name_Your_Channel_input"
                  placeholder="Name Your Channel"
                  onChange={onChanelName}
                />
              </div>
              <div>
                <input
                  id="Name_Your_Channel_input"
                  placeholder="User Name"
                  onChange={onUserName}
                />
              </div>
              <div id="Create_Channel">
                <Button onClick={onEnterChanel}>Join Channel</Button>
              </div>
            </div>
            {/* <GoogleLoginForm /> */}
          </div>

          <div className="icon__btn__container">
            <LibraryBooksIcon id="roomList" />
            <QueueIcon id="roomAdd" />
          </div>

          <div id="footer">
            <footer>
              <p id="left">@Copyright 2021 built by Owakeme.com</p>
              <p id="right">Sponsored by Kronosa.org</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
