import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductDetails.css";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import ProductDetailsLoading from "../../components/ProductDetailsLoading/ProductDetailsLoading";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        if (!ignore) setProduct(data);
      } catch (error) {
        console.error(error);
        if (!ignore) setProduct(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      ignore = true;
    };
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  console.log(product);
  
  
  if (loading) return <ProductDetailsLoading />;
  if (!product) return <p>Product Not Found</p>;
  
  const categoryTitle = product.category
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <div className="item_details">
        <div className="container">
          <ProductImages
            key={product.id}
            images={product.images}
            title={product.title}
          />

          <ProductInfo product={product} />
        </div>
      </div>

      <SlideProduct
        category={product.category}
        title={categoryTitle}
        excludeId={product.id}
      />
    </>
  );
}

export default ProductDetails;