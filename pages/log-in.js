import { Fragment, useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../components/UI/Form";

import firebase from "../firebase/index";

import useValidation from "../hooks/useValidation";
import validateLogIn from "../validation/validateLogIn";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const LogIn = () => {
  const [error, setError] = useState(false);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateLogIn, login);

  const { email, password } = values;

  async function login() {
    try {
      const user = await firebase.login(email, password);
      console.log(user);
      Router.push("/");
    } catch (error) {
      console.error("There was an error to log in", error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <Fragment>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Log In
          </h1>

          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.email && <Error>{errors.email}</Error>}

            <Field>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Your Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.password && <Error>{errors.password}</Error>}

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Log In" />
          </Form>
        </Fragment>
      </Layout>
    </div>
  );
};

export default LogIn;
