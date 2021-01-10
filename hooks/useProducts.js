import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase/index";

const useProducts = (order) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getProducts = () => {
      
      //metodo para traer todo el registro de firebase
      firebase.db
        .collection("products")
        .orderBy(order, "desc")
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

  return {
    products,
    loading,
  };
};

export default useProducts;
