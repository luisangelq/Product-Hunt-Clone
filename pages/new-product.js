import { Fragment, useState, useContext } from "react";
import { css } from "@emotion/react";
import Router, { useRouter } from "next/router";
import ShortId from "shortid";
import Layout from "../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../components/UI/Form";

import { FirebaseContext } from "../firebase/index";

import Error404 from "../components/layout/404";

import useValidation from "../hooks/useValidation";
import validateNewProduct from "../validation/validateNewProduct";

const INITIAL_STATE = {
  name: "",
  company: "",
  url: "",
  description: "",
};

const NewProduct = () => {
  //Pictures state
  const [image, setImage] = useState(null);

  const [error, setError] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useValidation(
    INITIAL_STATE,
    validateNewProduct,
    createProduct
  );

  const { name, company, url, description } = values;

  //Routing hook
  const router = useRouter();

  //context with crud firebase operations
  const { user, firebase } = useContext(FirebaseContext);

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setError(true);
    }
    setError(false);
  };

  const handleUpload = async () => {
    const uploadTask = await firebase.storage
      .ref(`products/${ShortId.generate()}`)
      .put(image);
    const downloadURL = await uploadTask.ref.getDownloadURL();
    return downloadURL;
  };

  async function createProduct() {
    if (!user) {
      return router.push("/login");
    }

    //create object of new product
    const product = {
      name,
      company,
      url,
      imageUrl: await handleUpload(),
      description,
      votes: 0,
      comments: [],
      created: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName,
      },
      haveVoted: []
    };

    //insert to database
    console.log(product);
    firebase.db.collection("products").add(product);
    return router.push("/");
  }

  const checkUrl = () => {
    if (url === "") {
      return null;
    }
    if (!/^(ftp|http|https|):\/\/[^"]+$/.test(url)) {
      return <Error>Url not Valid</Error>;
    }
  };

  return (
    <div>
      <Layout>
        {!user ? (
          <Error404 />
        ) : (
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
              <fieldset>
                <legend>General Information</legend>

                <Field>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Product Name"
                    name="name"
                    value={name}
                    onChange={handleChange}
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
                  />
                </Field>
                {errors.company && <Error>{errors.company}</Error>}

                <Field>
                  <label htmlFor="image">Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    name="image"
                    onInput={(e) => handleFile(e)}
                  />
                </Field>
                {!image ? <Error>You Need To Upload An Image</Error> : null}

                <Field>
                  <label htmlFor="url">Url:</label>
                  <input
                    type="url"
                    id="url"
                    placeholder="Product Url"
                    name="url"
                    value={url}
                    onChange={handleChange}
                  />
                </Field>
                {checkUrl()}
              </fieldset>

              <fieldset>
                <legend>About Your Product</legend>

                <Field>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                  />
                </Field>
                {errors.description && <Error>{errors.description}</Error>}
              </fieldset>

              {error && <Error>{error}</Error>}

              <InputSubmit type="submit" value="Create Product" />
            </Form>
          </Fragment>
        )}
      </Layout>
    </div>
  );
};

export default NewProduct;
