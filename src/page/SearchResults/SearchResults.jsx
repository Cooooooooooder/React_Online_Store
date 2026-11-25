import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Product from "../../components/slideProducts/Product";
import "./SearchResults.css";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!query) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let ignore = false;
    setLoading(true);

    fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=100`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) setProducts(data.products);
      })
      .catch((err) => {
        console.error(err);
        if (!ignore) setProducts([]);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [query]);

  return (
    <div className="search_page">
      <div className="container">
        <div className="top_slide">
          <h2>Search results</h2>
          {query && (
            <p>
              {loading
                ? "Searching..."
                : `${products.length} result${products.length === 1 ? "" : "s"} for "${query}"`}
            </p>
          )}
        </div>

        {!query ? (
          <p className="search_empty">Type something in the search box.</p>
        ) : loading ? null : products.length === 0 ? (
          <div className="search_empty">
            <p>No products found for "{query}".</p>
            <Link to="/" className="btn">
              Back to home
            </Link>
          </div>
        ) : (
          <div className="search_grid">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;