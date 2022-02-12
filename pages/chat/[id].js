import React from "react";
import Head from "next/head";
import { doc, getDoc, getDocs, orderBy, collection } from "firebase/firestore";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";

function ChatPage({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default ChatPage;

export async function getServerSideProps(context) {
  const chatId = context.query.id;
  const chatRef = doc(db, "chats", chatId);
  const messagesRef = collection(db, "chats", chatId, "messages");

  const messagesSnapshot = await getDocs(
    messagesRef,
    orderBy("timestamp", "asc")
  );
  const messages = messagesSnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      timestamp: message.timestamp.toDate().getTime(),
    }));

  const chatSnapshot = await getDoc(chatRef);
  const chat = {
    id: chatSnapshot.id,
    ...chatSnapshot.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
