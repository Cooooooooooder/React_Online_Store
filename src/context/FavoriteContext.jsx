import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext(null);

const loadFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch {
    return [];
  }
};

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);

  // حفظ المفضلة عشان متضيعش مع الريفريش
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {
      /* تجاهل الخطأ لو التخزين مش متاح */
    }
  }, [favorites]);

  const isFav = (id) => favorites.some((item) => item.id === id);

  // لو المنتج في المفضلة بيتشال، ولو مش فيها بيتضاف
  const toggleFav = (product) => {
    setFavorites((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [
            ...prev,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
              rating: product.rating,
              stock: product.stock,
            },
          ]
    );
  };

  return (
    <FavoriteContext.Provider value={{ favorites, isFav, toggleFav }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoriteContext);