import { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Search from "../UI/Search";
import Navigation from "./Navigation";
import Button from "../UI/Button";
import { FirebaseContext } from "../../firebase";

const ContentHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  margin-right: 2rem;
  cursor: pointer;
`;

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gray3);
        padding: 1rem 0;
      `}
    >
      <ContentHeader>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>U</Logo>
          </Link>

          <Search />

          <Navigation />
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <div>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hello: {user.displayName}
              </p>

              <Button bgColor="true" onClick={() => firebase.logOut()}>
                Log Out
              </Button>
            </div>
          ) : (
            <div>
              <Link href="/log-in">
                <Button bgColor="true">Log In</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </ContentHeader>
    </header>
  );
};

export default Header;
