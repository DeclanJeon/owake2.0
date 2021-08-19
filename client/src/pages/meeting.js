import React, { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";

/* Material UI */
import { makeStyles } from "@material-ui/core/styles";

import StreamPlayer from "../components/streamPlayer";
import NavBar from "../components/navBar";
import Chat from "../components/chat";

import AgoraRTC from "agora-rtc-sdk-ng";
import RTCClient from "../rtc-client";
import { IonIcon } from "@ionic/react";
import {
  clipboardOutline,
  micOutline,
  micOffOutline,
  videocamOutline,
  videocamOffOutline,
  shareOutline,
  logOutOutline,
} from "ionicons/icons";

import useRouter from "../utils/use-router";
import { onShareScreenUseYn } from "../reducer/actions/track";
/* CSS */
import "../assets/css/meeting.css";
import "../assets/css/navigator.css";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  view_container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
}));

//const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
let shareTrack = undefined;

const Room = () => {
  const classes = useStyles();
  const routerCtx = useRouter();
  const channelName = useSelector((state) => state.channelReducer.channelName);
  const [useMic, setUseMic] = useState(true);
  const [useVideocam, setUseVideocam] = useState(true);

  const client = useMemo(() => {
    return AgoraRTC.createClient({ codec: "h264", mode: "rtc" });
  }, []);

  const {
    localVideoTrack,
    localAudioTrack,
    remoteUsers,
    share,
    leave,
    onUseRtcMic,
    onUseRtcVideoCam,
  } = RTCClient(client);

  const onMic = () => {
    setUseMic(!useMic);
    localAudioTrack.setMuted(useMic);
  };

  const onVideocam = () => {
    setUseVideocam(!useVideocam);
    localVideoTrack.setMuted(useVideocam);
  };

  const onShareScreen = async function () {
    shareTrack = await share();
  };

  const onLeaveChannel = useCallback(() => {
    leave();
    routerCtx.history.push({ pathname: "/" });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="row__nav__container">
            <NavBar />
          </div>
          <div className="row__view__container">
            <div className="video__container">
              <div className={classes.view_container}>
                {/* <Container className={classes.cardGrid} maxWidth="md"> */}

                <StreamPlayer videoTrack={localVideoTrack} type="local" />
                {remoteUsers.map((user) => (
                  <StreamPlayer
                    audioTrack={user.audioTrack}
                    videoTrack={user.videoTrack}
                    shareTrack={shareTrack}
                    test={user}
                    type="remote"
                    uid={user.uid}
                    key={user.uid}
                  />
                ))}

                {/* </Container> */}
              </div>
            </div>

            <div className="bottom_container">
              <div className="view_mic">
                {useMic ? (
                  <IonIcon icon={micOutline} onClick={onMic} />
                ) : (
                  <IonIcon icon={micOffOutline} onClick={onMic} />
                )}
              </div>
              <div className="view_video">
                {useVideocam ? (
                  <IonIcon icon={videocamOutline} onClick={onVideocam} />
                ) : (
                  <IonIcon icon={videocamOffOutline} onClick={onVideocam} />
                )}
              </div>
              <div className="view_share">
                <IonIcon icon={shareOutline} onClick={onShareScreen} />
              </div>
              <div className="view_out">
                <IonIcon icon={logOutOutline} onClick={onLeaveChannel} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;
