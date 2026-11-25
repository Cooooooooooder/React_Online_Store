import HeroSlider from "../components/HeroSlider/HeroSlider";
import SlideProduct from "../components/slideProducts/SlideProduct";

const categories = [
  { slug: "smartphones", title: "Smartphones" },
  { slug: "mobile-accessories", title: "Mobile Accessories" },
  { slug: "laptops", title: "Laptops" },
  { slug: "tablets", title: "Tablets" },
  { slug: "sunglasses", title: "Sunglasses" },
  { slug: "sports-accessories", title: "Sports Accessories" },
];


function Home() {
  return (
    <div>
      <HeroSlider />

      {categories.map((cat) => (
        <SlideProduct key={cat.slug} category={cat.slug} title={cat.title} />
      ))}
    </div>
  );
}

export default Home;