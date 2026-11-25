import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

import toast  from 'react-hot-toast';

const loadCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    // أي منتج محفوظ قديم من غير كمية ياخد كمية 1
    return saved.map((item) => ({ ...item, quantity: item.quantity || 1 }));
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  // حفظ السلة عشان متضيعش مع الريفريش
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      /* تجاهل الخطأ لو التخزين مش متاح */
    }
  }, [cart]);

  const isInCart = (id) => cart.some((item) => item.id === id);

  // لو المنتج في السلة بيتشال، ولو مش فيها بيتضاف بكمية 1
  const toggleCart = (product) => {
    setCart((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [
            ...prev,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
              stock: product.stock,
              quantity: 1,
            },
          ]
    );
    if(isInCart(product.id)){
        toast.success('Successfully Removed from Cart!')
    }else{
        toast.success('Successfully Added to Cart!')

    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success('Successfully Removed from Cart!')

  };

  // الكمية متزيدش عن المتاح في المخزون (stock)
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity < (item.stock ?? Infinity)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // الكمية متقلش عن 1، ولحذف المنتج بنستخدم زرار الحذف
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isInCart,
        toggleCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);