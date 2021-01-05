import styled from "@emotion/styled";
import Layout from "../components/layout/Layout";

const Heading = styled.h1`
  color: blue;
`;

const Home = () => {
  return (
    <div>
      <Layout>
        <Heading>Home</Heading>
      </Layout>
    </div>
  );
};

export default Home;
