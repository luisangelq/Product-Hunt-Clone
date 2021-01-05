import styled from "@emotion/styled";
import Layout from "../components/layout/Layout";

const Heading = styled.h1`
  color: blue;
`;

const Popular = () => {
  return (
    <div>
      <Layout>
        <Heading>Popular</Heading>
      </Layout>
    </div>
  );
};

export default Popular;
