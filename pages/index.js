import Head from "next/head";
import Sidebar from "../components/Sidebar";
import LandingPage from "../components/LandingPage";
import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>My Messenger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <LandingPage />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;
