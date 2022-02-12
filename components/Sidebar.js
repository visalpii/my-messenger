import React from "react";
import { signOut } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import * as EmailValidator from "email-validator";
import Chat from "./Chat";
import { Avatar, Button, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

function Sidebar() {
  const [user] = useAuthState(auth);
  const chatsRef = collection(db, "chats");
  const userEmailQuery = query(
    chatsRef,
    where("users", "array-contains", user.email)
  );
  const [chatsSnapshot, loadingChatsSnapshot] = useCollection(userEmailQuery);

  const chatAlreadyExists = (recipientEmail) => {
    const duplicateEmails = [];
    chatsSnapshot.forEach((chat) => {
      const bothEmails = chat.data().users;
      bothEmails.forEach((email) => {
        if (email === recipientEmail) {
          duplicateEmails.push(email);
        }
      });
    });
    return duplicateEmails.length > 0 ? true : false;
  };

  const isRecipientInSystem = async (recipientEmail) => {
    const currentUsers = [];
    const recipientEmailQuery = query(
      collection(db, "users"),
      where("email", "==", recipientEmail)
    );
    const recipientSnapshot = await getDocs(recipientEmailQuery);
    recipientSnapshot.forEach((doc) => currentUsers.push(doc.data()));
    return currentUsers.length > 0 ? true : false;
  };

  const createChat = async () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with."
    );
    const userIsInSystem = await isRecipientInSystem(input);
    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      userIsInSystem &&
      input !== user.email
    ) {
      const docRef = await addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    }
  };

  const handleSignout = async () => {
    await signOut(auth);
  };

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={handleSignout} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
      {!loadingChatsSnapshot &&
        chatsSnapshot.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whtiesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const IconsContainer = styled.div``;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }

  color: inherit;

  :hover {
    background-color: whitesmoke;
  }
`;
