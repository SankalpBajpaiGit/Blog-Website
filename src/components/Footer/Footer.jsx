import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="py-6 bg-gray-100 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          
          {/* Logo */}
          <div>
            <Link to="/" className="inline-flex items-center">
              <Logo width="60px" />
            </Link>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
              Contact
            </h3>
            <Link className="text-sm text-gray-700 hover:text-blue-600" to="/contact">
              Contact
            </Link>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
              Help
            </h3>
            <Link className="text-sm text-gray-700 hover:text-blue-600" to="/help">
              Help
            </Link>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
              About
            </h3>
            <Link className="text-sm text-gray-700 hover:text-blue-600" to="/about">
              About
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
