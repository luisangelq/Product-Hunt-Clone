import { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase";

const Nav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gray2);
  }
`;

const Navigation = () => {
  const { user } = useContext(FirebaseContext);

  return (
    <Nav>
      <Link href="/">Home</Link>
      <Link href="/popular">Popular</Link>

      {user ? <Link href="/new-product">New Product</Link> : null}
    </Nav>
  );
};

export default Navigation;
