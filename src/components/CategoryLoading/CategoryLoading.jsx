import "../../page/Category/Category.css";

function CategoryLoading({ title }) {
  return (
    <div className="category_page">
      <div className="container">
        <h2 className="category_title">{title}</h2>

        <div className="products_grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="product_skeleton" key={i}>
              <div className="sk_img" />
              <div className="sk_line" />
              <div className="sk_line short" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryLoading;