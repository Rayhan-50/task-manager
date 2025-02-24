import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

import img1 from "../../assets/task1.jpeg";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out.",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.error("Logout error:", error);
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: "Something went wrong while logging out.",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 fixed top-0 z-50 w-full shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={img1} alt="Logo" className="w-12 h-12 mr-3" />
          <h1 className="text-lg font-bold text-white">Task Management System</h1>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          ☰
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex gap-x-6 absolute md:static w-full md:w-auto bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 md:bg-transparent left-0 top-16 md:top-auto p-4 md:p-0 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                  : "text-white hover:text-gray-200"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                  : "text-white hover:text-gray-200"
              }
            >
              Add
            </NavLink>
          </li>
        </ul>

        {/* User Profile & Authentication */}
        {user ? (
          <div className="relative">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={toggleDropdown}
            >
              <img
                src={user.photoURL || "/default-profile.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-sm font-medium text-white">{user.displayName}</p>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg py-2 w-48">
                <button
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex gap-3">
            <NavLink
              to="/login"
              className="px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-md hover:bg-yellow-500"
            >
              Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
