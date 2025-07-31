import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Description */}
        <div>
          <h2 className="text-white font-bold text-xl mb-4">Abel Consultant LLC</h2>
          <p>
            Your trusted partner for importing high-quality electronics, vehicles, and genuine spare parts. We simplify cross-border sourcing for personal and business needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/electronics" className="hover:text-white">Electronics</Link></li>
            <li><Link to="/vehicles" className="hover:text-white">Vehicles</Link></li>
            <li><Link to="/spareparts" className="hover:text-white">Spare Parts</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@abelconsultant.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Location: Nairobi, Kenya</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Abel Consultant LLC. All rights reserved.
      </div>
    </footer>
  );
}
