import React from "react";
import styled from "styled-components";

function ChatScreenDisabled() {
  return (
    <Container>
      <Header>
        <HeaderInformation>
          <h3>begin by clicking &quot;START A NEW CHAT&quot;</h3>
        </HeaderInformation>
      </Header>
      <MessageContainer>
        <h1>
          You can only start chats with someone that has logged in at least
          once.
        </h1>
        <EndOfMessage />
      </MessageContainer>
      <InputContainer>
        <Input />
      </InputContainer>
    </Container>
  );
}

export default ChatScreenDisabled;

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
  flex-direction: row;

  > h3 {
    margin-bottom: -15px;
    opacity: 0.5;
  }
`;
const HeaderIcons = styled.div``;
const MessageContainer = styled.div`
  padding: 60px;
  padding-bottom: 10px;
  background-color: #e5ded8;
  min-height: 90vh;

  > h1 {
    opacity: 0.5;
  }
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
