import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import StatusIcon from "@material-ui/icons/DonutLargeOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import ChatIcon from "@material-ui/icons/ChatOutlined";
import MoreHorizonIcon from "@material-ui/icons/MoreHorizOutlined";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";
import db from "./firebase";

function Sidebar() {
  const [groups, setgroups] = useState([]);
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    const unSubscribe = db.collection("userChats").onSnapshot((snap) =>
      setgroups(
        snap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () =>{
      unSubscribe();
    }
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <IconButton>
          <Avatar src={user?.photoURL}/>
        </IconButton>
        <div className="sidebar_headerRight">
          <IconButton>
            <StatusIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreHorizonIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchcontainer">
          <SearchIcon />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {groups.map((group) => (
          <SidebarChat key={group.id} id={group.id} name={group.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
