import { useEffect, useState } from 'react'
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import useProducts from "../hooks/useProducts";
import ProductDetails from "../components/layout/ProductDetails";
import Loading from "../components/UI/Loading";



const Search = () => {
  //asi lo lees desde el hook
  const router = useRouter();
  const { query: { q }} = router;
  
  //all Products
  const { products, loading } = useProducts("created");

  const [ result, setResult ] = useState([])
  
  useEffect(() => {
    if(!q || !products) return;
    const searching = q.toLowerCase();
    const filterProducts = products.filter(product => {
      return (
        product.name.toLowerCase().includes(searching) ||
        product.description.toLowerCase().includes(searching)
      )
    })
    setResult(filterProducts);
  }, [q, products])
  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            {Object.keys(products).length === 0 ? (
              <div>{loading ? <Loading /> : "There aren't any products"}</div>
            ) : (
              <ul className="bg-white">
                {result.map((product) => (
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

export default Search;
