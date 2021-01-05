import { Fragment, useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../components/UI/Form";

import firebase from "../firebase/index";

import useValidation from "../hooks/useValidation";
import validateRegister from "../validation/validateRegister";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const NewProduct = () => {
  const [error, setError] = useState(false);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateRegister, register);

  const { name, email, password } = values;

  async function register() {
    try {
      await firebase.register(name, email, password);
      Router.push("/");
    } catch (error) {
      console.error("There was an error to create the user", error.message);
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
            New Product
          </h1>

          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                name="name"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.name && <Error>{errors.name}</Error>}

            <Field>
              <label htmlFor="company">Company:</label>
              <input
                type="text"
                id="company"
                placeholder="Company Name"
                name="company"
                value={company}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.company && <Error>{errors.company}</Error>}

            <Field>
              <label htmlFor="picture">Picture:</label>
              <input
                type="file"
                id="picture"
                name="picture"
                value={picture}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.picture && <Error>{errors.picture}</Error>}


            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Register" />
          </Form>
        </Fragment>
      </Layout>
    </div>
  );
};

export default NewProduct;
