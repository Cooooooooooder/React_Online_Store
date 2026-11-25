import { Link } from "react-router-dom";
import { FaTrashAlt, FaCartArrowDown, FaCheck } from "react-icons/fa";
import Stars from "../../components/GlobalComponents/Stars";
import { useFavorites } from "../../context/FavoriteContext";
import { useCart } from "../../context/CartContext";
import "./Favorite.css";

function Favorite() {
  const { favorites, toggleFav } = useFavorites();
  const { isInCart, toggleCart } = useCart();

  return (
    <div className="fav_page">
      <div className="fav_summary">
        <h1>My Favorites</h1>

        <div className="fav_items">
          {favorites.length === 0 ? (
            <div className="fav_empty">
              <p>You have no favorite products yet.</p>
              <Link to="/" className="btn">
                Continue shopping
              </Link>
            </div>
          ) : (
            favorites.map((item) => {
              const inCart = isInCart(item.id);

              return (
                <div className="fav_item" key={item.id}>
                  <div className="fav_image_name">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.thumbnail} alt={item.title} />
                    </Link>

                    <div className="fav_content">
                      <Link to={`/product/${item.id}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <Stars rating={item.rating} />
                      <p className="fav_price">$ {item.price}</p>
                    </div>
                  </div>

                  <div className="fav_actions">
                    <button
                      className={inCart ? "fav_cart_btn in_cart" : "fav_cart_btn"}
                      onClick={() => toggleCart(item)}
                    >
                      {inCart ? <FaCheck /> : <FaCartArrowDown />}
                      {inCart ? "In cart" : "Add to cart"}
                    </button>

                    <button
                      className="fav_delete"
                      onClick={() => toggleFav(item)}
                      aria-label="Remove from favorites"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorite;