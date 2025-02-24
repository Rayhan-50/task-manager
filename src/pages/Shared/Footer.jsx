import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 text-white py-6 mt-10">
      <div className="container mx-auto text-center md:text-left px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-lg font-bold mb-2">Task Management System</h2>
            <p className="text-sm">
              Organize your tasks efficiently and boost productivity with our seamless task management system.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-2">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="hover:underline">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/add" className="hover:underline">
                  Add Task
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="hover:underline">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-bold mb-2">Contact Us</h2>
            <p>Email: rayhanahmed.nstu@gmail.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Farmgate, Dhaka</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-6 pt-4 text-sm text-gray-200 text-center">
          &copy; {new Date().getFullYear()} Task Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
