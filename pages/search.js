import styled from "@emotion/styled";
import Layout from "../components/layout/Layout";

const Heading = styled.h1`
  color: blue;
`;

const Search = () => {
  return (
    <div>
      <Layout>
        <Heading>Search</Heading>
      </Layout>
    </div>
  );
};

export default Search;
