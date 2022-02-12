import React from "react";
import styled from "styled-components";
import ChatScreenDisabled from "./ChatScreenDisabled";


function LandingPage() {
  return (
    <Container>
      <ChatContainer>
        <ChatScreenDisabled />
      </ChatContainer>
    </Container>
  );
}

export default LandingPage;

const Container = styled.div`
  flex: 1;
  background-color: green;
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
