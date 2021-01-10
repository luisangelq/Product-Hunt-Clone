import { Fragment } from "react";
import Header from "./Header";
import { Global, css } from "@emotion/react";
import Head from "next/head";

const Layout = (props) => {
  return (
    <Fragment>
      <Global
        styles={css`
          :root {
            --gray: #3d3d3d;
            --gray2: #6f6f6f;
            --gray3: #e1e1e1;
            --orange: #da552f;
          }
          html {
            font-family: 'Acme', sans-serif;
            font-size: 62.5%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem;
            line-height: 1.5;
          }
          h1,
          h2,
          h3 {
            margin: 0 0 2rem 0;
            line-height: 1.5;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          a {
            text-decoration: none;
          }
          
        `}
      />
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Acme&display=swap"
          rel="stylesheet"
        />
        <link href="/static/css/app.css" rel="stylesheet"/>
        <title>UmbralHunt</title>
      </Head>
      <Header />

      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
