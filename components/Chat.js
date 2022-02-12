import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../firebase";
import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import getRecipientEmail from "../utils/getRecipientEmail";
import { Avatar } from "@mui/material";
import styled from "styled-components";

function Chat({ id, users }) {
  const [user, loadingAuth, error] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);

  const usersCollectionRef = collection(db, "users");
  const q = query(usersCollectionRef, where("email", "==", recipientEmail));
  const [recipientSnapshot, loadingRecipientSnapshot] = useCollection(q);

  const router = useRouter();
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {!loadingRecipientSnapshot ? (
        <Avatar
          src={recipientSnapshot.docs[0].data().photoURL}
          sx={{ margin: "5px", marginRight: "15px" }}
        />
      ) : (
        <Avatar sx={{ margin: "5px", marginRight: "15px" }}>
          {recipientEmail[0]}
        </Avatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)``;
