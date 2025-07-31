import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero.jpg')" }}>
        <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 z-0"></div>
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight" data-aos="fade-up">
            Abel Consultant LLC
          </h1>
          <p className="mt-4 text-lg text-white max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Trusted partner for importing quality Electronics, Vehicles & Spare Parts.
          </p>
          <Link
            to="/electronics"
            className="mt-8 inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Explore Products
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="max-w-5xl mx-auto px-4" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">About Us</h2>
          <p className="text-gray-600 text-lg">
            Abel Consultant LLC specializes in importing premium electronics, vehicles, and spare parts.
            We combine competitive pricing, exceptional service, and high-quality products tailored to your personal or business needs.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" data-aos="fade-up">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <ServiceCard
              title="Electronics Import"
              desc="We source and deliver premium electronics from top brands globally."
              delay={0}
            />
            <ServiceCard
              title="Vehicle Import"
              desc="Importing new and used vehicles with guaranteed quality and compliance."
              delay={100}
            />
            <ServiceCard
              title="Spare Parts"
              desc="Genuine spare parts for all major vehicle models with quick delivery."
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 text-white text-center">
        <div data-aos="zoom-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let’s Get You Started</h2>
          <p className="mb-6 max-w-xl mx-auto">
            Need help finding the right product or import service? Reach out to our team today.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ title, desc, delay }) {
  return (
    <div
      className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition text-center"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
