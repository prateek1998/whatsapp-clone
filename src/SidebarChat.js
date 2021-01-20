import React, { useEffect, useState } from "react";
import "./Sidebarchat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [state, setstate] = useState("");
  const [message, setmessage] = useState("");
  useEffect(() => {
    if (id) {
      db.collection("userChats")
        .doc(id)
        .collection("message")
        .orderBy("timestamp", "desc")
        .onSnapshot((snap) => setmessage(snap.docs.map((doc) => doc.data())));
    }
  }, [id]);

  useEffect(() => {
    setstate(Math.floor(Math.random() * 1000));
  }, []);

  const createChat = () => {
    const rootName = prompt("Please enter your name");

    if (rootName) {
      db.collection("userChats").add({ name: rootName });
      console.log(rootName);
    }
  };

  return !addNewChat ? (
    <Link to={`/app/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${state}.svg`} />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <p>{message[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (<div></div>
    // <div onClick={createChat} className="sidebarChat">
    //   <h2>Add new Chat</h2>
    // </div>
  );
}

export default SidebarChat;
