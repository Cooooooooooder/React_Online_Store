import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useCart } from "../../context/CartContext";
import Search from "./Search/Search";
import { useFavorites } from "../../context/FavoriteContext";
import "./header.css";

function TopHeader() {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  return (
    <div className="top_header">
      <div className="container">
        <Link to="/">
          {" "}
          <img className="logo" src={Logo} alt="Logo" />
        </Link>

        <Search />

        <div className="header_icons">
          <Link to="/favorites">
            <div className="icon">
              <FaRegHeart />
              <span className="count">{favorites.length}</span>
            </div>
          </Link>

          <Link to="/cart">
            <div className="icon">
              <TiShoppingCart />
              <span className="count">{cart.length}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
