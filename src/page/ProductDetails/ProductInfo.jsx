import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart, FaShare } from "react-icons/fa";
import Stars from "../../components/GlobalComponents/Stars";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoriteContext";

function ProductInfo({ product }) {
  const { isInCart, toggleCart } = useCart();
  const { isFav, toggleFav } = useFavorites();

  return (
    <div className="details_item">
      <h1 className="name">{product.title}</h1>

      <div className="rating_row">
        <Stars rating={product.rating} />
        <span>{product.rating}</span>
      </div>

      <p className="price">$ {product.price}</p>

      <h5>
        Availability: <span>{product.availabilityStatus}</span>
      </h5>
      {product.brand && (
        <h5>
          Brand: <span>{product.brand}</span>
        </h5>
      )}
      <p className="desc">{product.description}</p>

      <h5 className="stock">
        <span>Hurry Up! Only {product.stock} products left in stock.</span>
      </h5>

      <button className="btn" onClick={() => toggleCart(product)}>
        {isInCart(product.id) ? "Remove from cart" : "Add to cart"}{" "}
        <TiShoppingCart />
      </button>

      <div className="icons">
        <span
          className={isFav(product.id) ? "in-fav" : ""}
          onClick={() => toggleFav(product)}
        >
          <FaRegHeart />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;