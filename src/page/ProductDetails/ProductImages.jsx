import { useState } from "react";

function ProductImages({ images, title }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="imgs_item">
      <div className="big_img">
        <img src={images[activeImg]} alt={title} />
      </div>

      <div className="sm_img">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={title}
            className={index === activeImg ? "active" : ""}
            onClick={() => setActiveImg(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImages;