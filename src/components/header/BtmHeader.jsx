import { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa";
import "./header.css";

const NavLinks = [
  { title: "Home", link: "/" },
  { title: "Blog", link: "/blog" },
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
];

function BtmHeader() {
  const [categories, setCategories] = useState([]);
 const location = useLocation();
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);


 return (
  <div className="btm_header">
    <div className="container">
      <nav className="nav">
        <div className="category_nav">
          <div className="category_btn">
            <IoMdMenu />
            <p>Browse Category</p>
            <MdOutlineArrowDropDown />
          </div>

          <ul className="category_nav_list">
            {categories.map((category) => (
              <li key={category.slug} >
                <Link
                  to={`/category/${category.slug}`}
                  className="category_nav_item"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="nav_links">
          {NavLinks.map((item) => (
            <li key={item.link}  className={location.pathname === item.link ? "active" : ""}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sign_regs_icon">
        <Link to="/">
          <PiSignInBold />
        </Link>
        <Link to="/">
          <FaUserPlus />
        </Link>
      </div>
    </div>
  </div>
);
}

export default BtmHeader;
