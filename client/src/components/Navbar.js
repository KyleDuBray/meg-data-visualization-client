import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import useMenuToggler from "../hooks/useMenuToggler";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const notificationWrapperRef = useRef(null);
  const [NotificationOpen, setNotificationOpen] = useMenuToggler(
    notificationWrapperRef
  );

  const sidebarWrapperRef = useRef(null);
  const [sidebarIsOpen, setSidebarIsOpen] = useMenuToggler(sidebarWrapperRef);

  return (
    <div className="min-h-full">
      <nav className="bg-gray-700">
        <div className="mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* https://icons8.com/icons/set/brain */}
                <Link to="/">
                  <img
                    className="h-8 w-8"
                    src="./icons/brain.png"
                    alt="brain icon"
                  />
                </Link>
              </div>
              {/* <-- Main Nav Links --> */}
              <div>
                <ul className="ml-10 flex items-end space-x-4">
                  <button
                    onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                    ref={sidebarWrapperRef}
                    type="button"
                    className={`md:invisible ${!user ? "invisible" : ""}`}
                  >
                    <AiOutlineMenuUnfold className="text-white w-6 h-6 md:w-0" />
                  </button>

                  <div
                    className={`${
                      !sidebarIsOpen ? "opacity-0" : ""
                    } md:invisible bg-gray-800 absolute left-0 top-16 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    {/* MOBILE SIDEBAR LINKS */}
                    <>
                      <Link
                        to="/dashboard/projects"
                        className="block px-4 py-2 text-sm text-white hover:text-gray-800 hover:bg-gray-200"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        Projects
                      </Link>
                    </>

                    <>
                      <Link
                        to="/dashboard/data"
                        className="block px-4 py-2 text-sm text-white hover:text-gray-800 hover:bg-gray-200"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        Data
                      </Link>
                    </>
                  </div>
                  <li
                    className={`${
                      user ? "invisible" : ""
                    } text-gray-300 hover:bg-gray-700 hover:text-white font-medium`}
                  >
                    <Link to="/about">About</Link>
                  </li>
                  <li
                    className={`${
                      user ? "invisible" : ""
                    } text-gray-300 hover:bg-gray-700 hover:text-white font-medium`}
                  >
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/*<!-- Notifications and Logout -->*/}
            <div>
              <div
                className={`${
                  !user ? "invisible" : ""
                } ml-4 flex items-center md:ml-6`}
              >
                {/*<!-- Notifications dropdown -->*/}
                <button
                  type="button"
                  onClick={() => setNotificationOpen(!NotificationOpen)}
                  ref={notificationWrapperRef}
                  className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <IoNotificationsOutline className="text-gray-300 w-6 h-6" />
                </button>
                <div
                  className={`${
                    !NotificationOpen ? "opacity-0" : ""
                  } absolute right-0 top-14 z-10 mt-2 w-full md:w-64 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                ></div>

                {/*<!-- Logout -->*/}
                <div className="relative ml-3">
                  <button
                    className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-200 hover:text-black w-full text-left"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                    <FiLogOut className="h-6 w-6 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
