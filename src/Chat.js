import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticonOutlined,
  Mic,
  SearchOutlined,
} from "@material-ui/icons";
import MoreHorizonIcon from "@material-ui/icons/MoreHorizOutlined";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import db from "./firebase";

function Chat() {
  const [state, setstate] = useState("");
  const [input, setInput] = useState("");
  const { groupId } = useParams();
  const [groupName, setgroupName] = useState("");
  const [message, setmessage] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    if (groupId) {
      db.collection("userChats")
        .doc(groupId)
        .onSnapshot((snap) => setgroupName(snap.data().name));
      db.collection("userChats")
        .doc(groupId)
        .collection("message")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => setmessage(snap.docs.map((doc) => doc.data())));
    }
  }, [groupId]);
  useEffect(() => {
    setstate(Math.floor(Math.random() * 1000));
  }, [groupName]);

  const sendmsg = (e) => {
    e.preventDefault();
    db.collection("userChats").doc(groupId).collection("message").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${state}.svg`} />
        <div className="chat_header_info">
          <h3>{groupName}</h3>
          <p>Last seen at {new Date(message[message.length-1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreHorizonIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {message.map((msg) => (
          <p className={`chat_msg ${msg.name===user.displayName&& "chat_reciever"}`}>
            <span className="chat_name">{msg.name}</span>
            {msg.message}
            <span className="chat_timestamp">
              {new Date(msg.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonOutlined />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendmsg} type="submit">
            Send
          </button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
