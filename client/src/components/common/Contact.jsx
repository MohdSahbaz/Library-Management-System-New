import { useEffect, useRef, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBook,
} from "react-icons/fa";
import "../animations/animations.css";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const formRef = useRef();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const sendEmail = (e) => {
    setSending(true);
    e.preventDefault();
    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setMessage("Message sent successfully!");
          // Ensuring form reset
          if (formRef.current) {
            formRef.current.reset(); // Clears the input fields
          }
          setSending(false);
        },
        (error) => {
          setMessage("Failed to send message.");
          setSending(false);
        }
      );
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-emerald-50 flex flex-col items-center py-10 px-4 fade-in">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <div className="max-w-4xl w-full bg-emerald-100 text-gray-900 p-6 rounded-sm shadow-lg">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-emerald-800 flex items-center">
              <FaBook className="mr-2" /> Get in Touch
            </h2>
            <p className="text-gray-600 mt-2">
              Have any questions? Reach out to us and we’ll be happy to assist
              you.
            </p>
            <div className="mt-4 space-y-3">
              <p className="flex items-center text-gray-700">
                <FaMapMarkerAlt className="text-emerald-700 mr-2" /> Mumbai,
                India
              </p>
              <p className="flex items-center text-gray-700">
                <FaPhone className="text-emerald-700 mr-2" /> +913 630 8474
              </p>
              <p className="flex items-center text-gray-700">
                <FaEnvelope className="text-emerald-700 mr-2" />{" "}
                sahbaz@gmail.com
              </p>
            </div>

            {/* Social Media */}
            <div className="mt-4 flex space-x-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="text-emerald-700 hover:text-emerald-900"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                className="text-emerald-700 hover:text-emerald-900"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="text-emerald-700 hover:text-emerald-900"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="flex flex-col space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              className="border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              className="border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              name="message"
              className="border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            ></textarea>
            <button
              type="submit"
              disabled={sending}
              className="bg-emerald-700 text-white py-2 rounded-sm hover:bg-emerald-900 transition"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
            {message && (
              <div
                className={`mt-4 text-center font-semibold ${
                  message.includes("success")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
