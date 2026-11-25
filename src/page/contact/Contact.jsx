import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import "./Contact.css";

// عدّل بيانات التواصل هنا
const contactInfo = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    text: "123 Street Name, City, Country",
  },
  { icon: <FaPhoneAlt />, title: "Phone", text: "+00 123 456 7890" },
  { icon: <FaEnvelope />, title: "Email", text: "info@yourstore.com" },
  { icon: <FaClock />, title: "Working hours", text: "Sat - Thu: 9am - 6pm" },
];

const emptyForm = { name: "", email: "", subject: "", message: "" };

function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setSent(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Please enter your name";

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.subject.trim()) newErrors.subject = "Please enter a subject";

    if (!form.message.trim()) {
      newErrors.message = "Please write your message";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // هنا تبعت البيانات للسيرفر (API) لما يبقى عندك واحد
    setSent(true);
    setForm(emptyForm);
  };

  return (
    <div className="contact_page">
      <div className="container">
        <div className="top_slide">
          <h2>Contact Us</h2>
          <p>Have a question? We would love to hear from you.</p>
        </div>

        <div className="contact_info">
          {contactInfo.map((item) => (
            <div className="contact_card" key={item.title}>
              <div className="contact_icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <form className="contact_form" onSubmit={handleSubmit} noValidate>
          <h3>Send us a message</h3>

          {sent && (
            <p className="contact_success">
              Thank you! Your message has been sent.
            </p>
          )}

          <div className="contact_row">
            <div className="contact_field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? "has_error" : ""}
              />
              {errors.name && <small>{errors.name}</small>}
            </div>

            <div className="contact_field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "has_error" : ""}
              />
              {errors.email && <small>{errors.email}</small>}
            </div>
          </div>

          <div className="contact_field">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="How can we help?"
              value={form.subject}
              onChange={handleChange}
              className={errors.subject ? "has_error" : ""}
            />
            {errors.subject && <small>{errors.subject}</small>}
          </div>

          <div className="contact_field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Write your message here..."
              value={form.message}
              onChange={handleChange}
              className={errors.message ? "has_error" : ""}
            ></textarea>
            {errors.message && <small>{errors.message}</small>}
          </div>

          <button type="submit" className="btn contact_btn">
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;