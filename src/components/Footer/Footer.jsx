import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="py-6 bg-gradient-to-b from-blue-400 to-blue-600 border-t-4 border-blue-900 shadow-lg text-white font-[Comic Sans MS]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center text-center">
          {/* Logo */}
          <div>
            <Link to="/" className="inline-flex items-center">
              <Logo width="60px" className="drop-shadow-lg" />
            </Link>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-sm font-bold uppercase text-yellow-300 mb-2">
              Contact
            </h3>
            <Link className="text-sm text-yellow-100 hover:text-yellow-300 underline" to="/contact">
              Contact
            </Link>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-sm font-bold uppercase text-yellow-300 mb-2">
              Help
            </h3>
            <Link className="text-sm text-yellow-100 hover:text-yellow-300 underline" to="/help">
              Help
            </Link>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-sm font-bold uppercase text-yellow-300 mb-2">
              About
            </h3>
            <Link className="text-sm text-yellow-100 hover:text-yellow-300 underline" to="/about">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
