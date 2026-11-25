import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/slideProducts/Product";
import CategoryLoading from "../../components/CategoryLoading/CategoryLoading";
import "./Category.css";

function Category() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    fetch(`https://dummyjson.com/products/category/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setProducts(data.products || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) {
          setProducts([]);
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [slug]);

  const title = slug.replace(/-/g, " ");

  if (loading) return <CategoryLoading title={title} />;

  return (
    <div className="category_page">
      <div className="container">
        <h2 className="category_title">{title}</h2>

        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="products_grid">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;