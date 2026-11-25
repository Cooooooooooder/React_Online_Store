import TopHeader from "./components/header/TopHeader";
import BtmHeader from "./components/header/BtmHeader";
import Home from "./page/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./page/ProductDetails/ProductDetails";
import Cart from "./page/cart/Cart";
import { Toaster } from "react-hot-toast";
import Category from "./page/Category/Category";
import SearchResults from "./page/SearchResults/SearchResults";
import Favorite from "./page/favorite/Favorite";
import Blog from "./page/blog/Blog";
import Contact from "./page/contact/Contact";
import About from "./page/about/About";

function App() {
  return (
    <>
      <header>
        <TopHeader />
        <BtmHeader />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
