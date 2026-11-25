import { Link } from "react-router-dom";
import { FaCartArrowDown, FaRegHeart, FaShare, FaCheck } from "react-icons/fa";
import Stars from "../GlobalComponents/Stars";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoriteContext";

function Product({ product }) {
  const { isInCart, toggleCart } = useCart();
  const { isFav, toggleFav } = useFavorites();

  const inCart = isInCart(product.id);
  const inFav = isFav(product.id);

  return (
    <div className="product">
      {inCart && (
        <p className="in_cart_label">
          <FaCheck /> in cart
        </p>
      )}

      <Link to={`/product/${product.id}`}>
        <div className="img_product">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <p className="name_product">{product.title}</p>

        <Stars rating={product.rating} />

        <p className="price">$ {product.price}</p>
      </Link>

      <div className="icons">
        <span
          className={inCart ? "in-cart" : ""}
          onClick={() => toggleCart(product)}
        >
          <FaCartArrowDown />
        </span>
        <span
          className={inFav ? "in-fav" : ""}
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

export default Product;