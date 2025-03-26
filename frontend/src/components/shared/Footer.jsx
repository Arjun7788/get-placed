import React from "react";

const Footer = ({ isLoggedIn }) => {
  return (
    <footer className="bg-white border-t border-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900">GetPlaced</h2>
            <p className="text-gray-600 max-w-sm mt-2">
              Your complete guide to acing placements—get essential updates,
              resources, and support from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-1">
                <li>
                  <a href="/" className="hover:text-gray-500">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/jobs" className="hover:text-gray-500">
                    Internships
                  </a>
                </li>
                <li>
                  <a href="/browse" className="hover:text-gray-500">
                    Browse
                  </a>
                </li>
                {isLoggedIn && (
                  <>
                    <li>
                      <a href="/committee" className="hover:text-gray-500">
                        Committee
                      </a>
                    </li>
                    <li>
                      <a href="/material" className="hover:text-gray-500">
                        Material
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <ul className="space-y-1">
                <li>
                  <a href="/faqs" className="hover:text-gray-500">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2025 GetPlaced. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
