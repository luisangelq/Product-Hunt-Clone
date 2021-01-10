import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase/index";

import ProductDetails from "../components/layout/ProductDetails";
import Loading from "../components/UI/Loading";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      //metodo para traer todo el registro de firebase
      firebase.db
        .collection("products")
        .orderBy("created", "desc")
        .onSnapshot(driveSnapshot);
      
        
    };
    getProducts();
    
  }, []);

  //metodo para traer todo el registro de firebase
  function driveSnapshot(snapshot) {
    const products = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setProducts(products);
    setLoading(false);
  }

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            {Object.keys(products).length === 0 ? (
              <div>{loading ? <Loading /> : "There aren't any products"}</div>
            ) : (
              <ul className="bg-white">
                {products.map((product) => (
                  <ProductDetails key={product.id} product={product} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
