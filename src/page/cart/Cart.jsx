import { Link } from "react-router-dom";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="checkout">
      <div className="ordersummary">
        <h1>Order Summary</h1>

        <div className="items">
          {cart.length === 0 ? (
            <div className="empty_cart">
              <p>Your Cart is empty.</p>
              <Link to="/" className="btn">
                Continue shopping
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div className="item_cart" key={item.id}>
                <div className="image_name">
                  <Link to={`/product/${item.id}`}>
                    <img src={item.thumbnail} alt={item.title} />
                  </Link>

                  <div className="content">
                    <Link to={`/product/${item.id}`}>
                      <h4>{item.title}</h4>
                    </Link>

                    <p className="price">$ {item.price}</p>

                    <div className="qty_control">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        disabled={item.quantity === 1}
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        disabled={item.quantity >= (item.stock ?? Infinity)}
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    {item.quantity >= (item.stock ?? Infinity) && (
                      <p className="stock_note">
                        Only {item.stock} available in stock
                      </p>
                    )}
                  </div>
                </div>

                <div className="item_actions">
                  <p className="line_total">
                    $ {(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    className="delete_item"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart_footer">
            <div className="total">
              <p>Total ({totalItems} items)</p>
              <h3>$ {totalPrice.toFixed(2)}</h3>
            </div>

            <button className="btn checkout_btn">Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
