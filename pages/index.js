import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";
import Loading from "../components/UI/Loading";
import useProducts from "../hooks/useProducts";

const Home = () => {
  
  const { products, loading } = useProducts("created");

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
