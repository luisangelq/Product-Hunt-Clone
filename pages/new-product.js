import { Fragment, useState, useContext } from "react";
import { css } from "@emotion/react";
import Router, { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";
import Layout from "../components/layout/Layout";
import { Form, Field, InputSubmit, Error } from "../components/UI/Form";

import { FirebaseContext } from "../firebase/index";

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

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidation(INITIAL_STATE, validateNewProduct, createProduct);

  const { name, company, url, description } = values;

  //Routing hook
  const router = useRouter();

  //context with crud firebase operations
  const { user, firebase } = useContext(FirebaseContext);

  const handleFile = e => {
    if(e.target.files[0]){
      console.log(e.target.files[0])
      setImage(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    const uploadTask = await firebase.storage.ref(`products/${image.lastModified}${image.name}`).put(image);
    const downloadURL = await uploadTask.ref.getDownloadURL();
    return downloadURL
  }

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
    };

    //insert to database
    console.log(product);
    firebase.db.collection("products").add(product);
    return router.push("/")
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
            <fieldset>
              <legend>General Information</legend>

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
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  name="image"
                  onInput={(e) => handleFile(e)}
                />
              </Field>

              <Field>
                <label htmlFor="url">Url:</label>
                <input
                  type="url"
                  id="url"
                  placeholder="Product Url"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.url && <Error>{errors.url}</Error>}
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
                  onBlur={handleBlur}
                />
              </Field>
              {errors.description && <Error>{errors.description}</Error>}
            </fieldset>

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Create Product" />
          </Form>
        </Fragment>
      </Layout>
    </div>
  );
};

export default NewProduct;
