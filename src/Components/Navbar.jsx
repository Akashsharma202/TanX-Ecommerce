import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); //to see if hamburger needed or not
  const navigate = useNavigate();  //to navigate on clicking link
  // Logout using reload
  const handleLogout = () => {
    props.setSuccess(false);
    navigate("/");
    window.location.reload();
  };
  // toggles the isMobileMenuOpen basically open and close hamburger
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="z-2">
      <nav className="bg-grey-100 border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={props.success ? "/main" : "/"} className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap font-poppins">
              TanX
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={`w-full md:block md:w-auto ${isMobileMenuOpen ? "block" : "hidden"}`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <NavLink
                  to={props.success ? "/wishlist" : "/"}
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0"
                  activeClassName="bg-blue-500"
                >
                  {props.success ? "Wishlist" : ""}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={props.success ? "/cart" : "/login"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  activeClassName="text-blue-700"
                >
                  {props.success ? "Cart" : "Login"}
                </NavLink>
              </li>
              <li>
                {props.success ? (
                  <button
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    onClick={handleLogout}
                  >
                    LogOut
                  </button>
                ) : (
                  <NavLink
                    to="/"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    activeClassName="text-blue-700"
                  >
                    Register
                  </NavLink>
                )}
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
