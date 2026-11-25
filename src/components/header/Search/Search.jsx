import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Search.css";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const navigate = useNavigate();

  // البحث بعد ما المستخدم يوقف كتابة لـ 400ms
  useEffect(() => {
    const term = query.trim();

    if (term.length < 1) {
      setResults([]);
      setLoading(false);
      return;
    }

    let ignore = false;
    setLoading(true);

    const timer = setTimeout(() => {
      fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(term)}&limit=6`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!ignore) setResults(data.products);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          if (!ignore) setLoading(false);
        });
    }, 400);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [query]);

  // قفل القايمة لما تدوس برّه البحث
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enter أو الضغط على زرار البحث: روح لصفحة النتايج
  const handleSubmit = (e) => {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;

    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  // اختيار منتج من القايمة
  const handleSelect = () => {
    setOpen(false);
    setQuery("");
  };

  const term = query.trim();
  const showDropdown = open && term.length >= 1;

  return (
    <div className="search_wrapper" ref={boxRef}>
      <form className="search_box" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for products..."
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        <button type="submit" aria-label="Search">
          <FaSearch />
        </button>
      </form>

      {showDropdown && (
        <div className="search_results">
          {loading ? (
            <p className="search_msg">Searching...</p>
          ) : results.length === 0 ? (
            <p className="search_msg">No products found</p>
          ) : (
            <>
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="search_item"
                  onClick={handleSelect}
                >
                  <img src={product.thumbnail} alt={product.title} />
                  <div className="search_info">
                    <h4>{product.title}</h4>
                    <span>$ {product.price}</span>
                  </div>
                </Link>
              ))}

              <Link
                to={`/search?q=${encodeURIComponent(term)}`}
                className="search_all"
                onClick={() => setOpen(false)}
              >
                View all results
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;