import { Avatar, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import {
  collection,
  query,
  where,
  orderBy,
  doc,
  setDoc,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import TimeAgo from "timeago-react";

function ChatScreen({ chat, messages }) {
  const endOfMessagesRef = useRef(null);
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();
  const chatId = router.query.id;
  const recipientEmail = getRecipientEmail(chat.users, user);
  const recipientQuery = query(
    collection(db, "users"),
    where("email", "==", recipientEmail)
  );
  const [recipientSnapshot, loadingRecipientSnap] =
    useCollection(recipientQuery);
  const messagesQuery = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("timestamp", "asc")
  );
  const [messagesSnapshot, loadingMessagesSnap] = useCollection(messagesQuery);
  const messagesRef = collection(db, "chats", chatId, "messages");

  const showMessages = () => {
    if (!loadingMessagesSnap) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        lastSeen: Timestamp.now(),
      },
      { merge: true }
    );

    const docRef = await addDoc(messagesRef, {
      timestamp: Timestamp.now(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();
  };

  if (!loadingRecipientSnap) {
    const recipient = recipientSnapshot.docs[0].data();
  }

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {!loadingRecipientSnap ? (
            <p>
              Last Active:{" "}
              {recipient.lastSeen.toDate() ? (
                <TimeAgo datetime={recipient.lastSeen.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last active...</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit" onClick={sendMessage} hidden disabled={!input}>
          Send Message
        </button>
        <MicIcon />
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: -15px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcons = styled.div``;
const MessageContainer = styled.div`
  padding: 20px;
  padding-bottom: 10px;
  background-color: #e5ded8;
  min-height: 90vh;
`;
const EndOfMessage = styled.div``;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;
