import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaUndoAlt,
} from "react-icons/fa";
import "./About.css";

// عدّل البيانات دي عشان تناسب متجرك
const STORE_NAME = "Ramadan Online Store";

const stats = [
  { end: 10000, suffix: "+", label: "Happy customers" },
  { end: 5000, suffix: "+", label: "Products" },
  { end: 40, suffix: "+", label: "Categories" },
  { end: 5, suffix: "", label: "Years of experience" },
];

const features = [
  {
    icon: <FaTruck />,
    title: "Fast delivery",
    text: "Your orders reach your door quickly and safely.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure payment",
    text: "Your payment details are always protected.",
  },
  {
    icon: <FaUndoAlt />,
    title: "Easy returns",
    text: "Not happy with your order? Return it with no hassle.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 support",
    text: "Our team is here to help you any time you need.",
  },
];

// عدّاد بيعدّ من صفر للرقم لما يظهر في الشاشة
function CountUp({ end, suffix }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1500;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.floor(progress * end));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end]);

  return (
    <h3 ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </h3>
  );
}

function About() {
  return (
    <div className="about_page">
      <div className="container">
        <div className="top_slide">
          <h2>About Us</h2>
          <p>Get to know {STORE_NAME}.</p>
        </div>

        {/* القصة */}
        <section className="about_intro">
          <div className="about_text">
            <h3>Your trusted online store</h3>
            <p>
              {STORE_NAME} started with a simple idea: make shopping for
              quality products easy, fast and enjoyable for everyone.
            </p>
            <p>
              We bring together a wide range of products, from electronics and
              accessories to everyday essentials, all at fair prices. Every
              item is chosen with care so you can shop with confidence.
            </p>
            <p>
              Our goal is to give every customer a smooth experience, from
              browsing to delivery, backed by friendly support.
            </p>

            <Link to="/" className="btn">
              Start shopping
            </Link>
          </div>

          <div className="about_visual">
            <FaShoppingCart />
          </div>
        </section>

        {/* الأرقام */}
        <section className="about_stats">
          {stats.map((item) => (
            <div className="about_stat" key={item.label}>
              <CountUp end={item.end} suffix={item.suffix} />
              <p>{item.label}</p>
            </div>
          ))}
        </section>

        {/* المميزات */}
        <section className="about_features">
          <h3 className="about_title">Why choose us</h3>

          <div className="about_features_grid">
            {features.map((item) => (
              <div className="about_feature" key={item.title}>
                <div className="about_icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;