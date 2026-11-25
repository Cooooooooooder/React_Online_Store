import "./ProductDetailsLoading.css";

function ProductDetailsLoading() {
  return (
    <div className="pd_loading">
      <div className="container">
        {/* الصور */}
        <div className="pd_loading_imgs">
          <div className="sk pd_loading_big_img"></div>

          <div className="pd_loading_thumbs">
            <div className="sk pd_loading_thumb"></div>
            <div className="sk pd_loading_thumb"></div>
            <div className="sk pd_loading_thumb"></div>
          </div>
        </div>

        {/* التفاصيل */}
        <div className="pd_loading_details">
          <div className="sk pd_loading_line title"></div>
          <div className="sk pd_loading_line stars"></div>
          <div className="sk pd_loading_line price"></div>
          <div className="sk pd_loading_line short"></div>
          <div className="sk pd_loading_line short"></div>
          <div className="sk pd_loading_line"></div>
          <div className="sk pd_loading_line"></div>
          <div className="sk pd_loading_line medium"></div>

          <div className="sk pd_loading_btn"></div>

          <div className="pd_loading_icons">
            <div className="sk pd_loading_icon"></div>
            <div className="sk pd_loading_icon"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsLoading;