import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ShortId from "shortid";
import { FirebaseContext } from "../../firebase/index";
import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/404";
import Loading from "../../components/UI/Loading";
import { Field, InputSubmit } from "../../components/UI/Form";
import Button from "../../components/UI/Button";
import styled from "@emotion/styled";

const Content = styled.div`
  max-width: 1200px;
  width: 95%;
  padding: 5rem 0;
  margin: 0 auto;
  margin-top: 5rem;
`;

const Title = styled.h1`
  text-align: center;
`;

const Image = styled.div`
  display: flex;
  justify-content: center;

  img {
    height: 70%;
  }
`;

const ProductContent = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const CommentBox = styled.li`
  border: 1px solid #e1e1e1;
  padding: 2rem;

  span {
    font-weight: bold;
  }
`;

const Owner = styled.p`
  color: #da552f;
  text-transform: uppercase;
  font-weight: bold;
`;

const Likes = styled.p`
  margin-top: 5rem;
  text-align: center;
`;

const Product = () => {
  const [product, setProduct] = useState({});
  const [consultDB, setConsultDB] = useState(true);
  const [error, setError] = useState(false);
  const [comment, setComment] = useState({});

  //routing to get current id
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //firebase context
  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && consultDB) {
      const getProduct = async () => {
        const queryProduct = await firebase.db.collection("products").doc(id);
        const product = await queryProduct.get();

        if (product.exists) {
          setProduct(product.data());
          setConsultDB(false);
        } else {
          setError(true);
          setConsultDB(false);
        }
      };
      getProduct();
    }
  }, [id, consultDB]);

  //Admin and validate votes
  const voteProduct = () => {
    if (!user) {
      return router.push("/login");
    }
    //Verify if user has already voted
    if (haveVoted.includes(user.uid)) return;

    const newTotalVotes = votes + 1;
    //save id of user has alreade voted
    const newHaveVoted = [...haveVoted, user.uid];

    //Update on database
    firebase.db
      .collection("products")
      .doc(id)
      .update({ votes: newTotalVotes, haveVoted: newHaveVoted });

    //update state
    setProduct({
      ...product,
      votes: newTotalVotes,
      newHaveVoted,
    });

    setConsultDB(true);
  };

  const {
    name,
    comments,
    created,
    description,
    company,
    url,
    imageUrl,
    votes,
    creator,
    haveVoted,
  } = product;

  //Functions to create Comments
  const commentChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const addComment = (e) => {
    e.preventDefault();

    if (!user) {
      return router.push("/login");
    }

    //Extra Information
    comment.userId = user.uid;
    comment.userName = user.displayName;

    //Take comments copy
    const newComments = [...comments, comment];

    //Update Database
    firebase.db.collection("products").doc(id).update({
      comments: newComments,
    });
    //Update State
    setProduct({
      ...product,
      comments: newComments,
    });

    setConsultDB(true);
  };

  //Identify if comment is from creator
  const isCreator = (id) => {
    if (creator.id === id) {
      return true;
    }
  };

  //Delete only by owner
  const canDelete = () => {
    if (!user) return false;
    if (creator.id === user.uid) return true;
  };

  const deleteProduct = async () => {
    if (!user) return router.push("/login");
    if (creator.id !== user.uid) return router.push("/");

    try {
      await firebase.db.collection("products").doc(id).delete();
      router.push("/")
      
    } catch (error) {
      console.log("We could't delete it",error);
    }
  };
  return (
    <Layout>
      {error ? <Error404 /> : null}
      {Object.keys(product).length === 0 ? (
        <div className="contenedor">
          <Loading />
        </div>
      ) : (
        <Content>
          <Title>{name}</Title>

          <ProductContent>
            <div>
              <p>
                Posted {created ? formatDistanceToNow(new Date(created)) : null}{" "}
                ago
              </p>
              <p>
                Published By: {creator.name} <br /> From: {company}
              </p>
              <Image>
                <img src={imageUrl} />
              </Image>

              <p>{description}</p>

              {user && (
                <div>
                  <h2>Add your Comment</h2>
                  <form onSubmit={addComment}>
                    <Field>
                      <input
                        type="text"
                        name="comment"
                        onChange={commentChange}
                      />
                    </Field>
                    <InputSubmit type="submit" value="Add Comment" />
                  </form>
                </div>
              )}

              <h2>Comments:</h2>

              {comments.length === 0 ? (
                "There Are No Comments Yet"
              ) : (
                <ul>
                  {comments.map((comment) => (
                    <CommentBox key={ShortId.generate()}>
                      <p>{comment.comment}</p>
                      <p>
                        Writted By: <span>{comment.userName}</span>{" "}
                      </p>

                      {isCreator(comment.userId) && <Owner>Owner</Owner>}
                    </CommentBox>
                  ))}
                </ul>
              )}
            </div>

            <aside>
              {url ? (
                <Button target="_blank" bgColor="true" href={url}>
                  Visit Url
                </Button>
              ) : null}

              <Likes>{votes} Likes</Likes>

              {user && <Button onClick={voteProduct}>Like</Button>}
            </aside>
          </ProductContent>

          {canDelete() && (
            <Button
              onClick={deleteProduct}
              style={{ backgroundColor: "#DC2727" }}
            >
              Delete Product
            </Button>
          )}
        </Content>
      )}
    </Layout>
  );
};

export default Product;
