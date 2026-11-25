import "./SlideProductLoading.css";

function ProductCardSkeleton() {
  return (
    <div className="sp_loading_card">
      <div className="sk sp_loading_img"></div>
      <div className="sk sp_loading_line name"></div>
      <div className="sk sp_loading_line stars"></div>
      <div className="sk sp_loading_line price"></div>
    </div>
  );
}

function SlideProductLoading() {
  return (
    <div className="slide_products sp_loading">
      <div className="container">
        {/* العنوان والوصف */}
        <div className="top_slide">
          <div className="sk sp_loading_title"></div>
          <div className="sk sp_loading_desc"></div>
        </div>

        {/* كروت المنتجات */}
        <div className="sp_loading_grid">
          {[...Array(5)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SlideProductLoading;