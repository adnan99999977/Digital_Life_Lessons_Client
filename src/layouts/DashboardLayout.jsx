import { Link, Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import {
  HomeIcon,
  UserIcon,
  PlusCircleIcon,
  BookOpenIcon,
  CurrencyDollarIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "../utils/logo/Logo";
import { useState } from "react";

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <div className="drawer lg:drawer-open min-h-screen bg-gray-50">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle"
          checked={drawerOpen}
          onChange={toggleDrawer}
        />

        {/* Main content */}
        <div className="drawer-content flex flex-col min-h-screen transition-all duration-300">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300 px-4 py-2 flex items-center justify-between lg:justify-start shadow-md">
            <div className="flex items-center gap-2">
              {/* Hamburger toggle for mobile */}
              <button
                onClick={toggleDrawer}
                className="lg:hidden btn btn-square btn-ghost p-1"
              >
                {drawerOpen ? (
                  <XMarkIcon className="h-6 w-6 text-gray-700" />
                ) : (
                  <Bars3Icon className="h-6 w-6 text-gray-700" />
                )}
              </button>
              <div className="text-lg font-semibold hidden lg:block">Dashboard</div>
            </div>
          </nav>

          {/* Page content */}
          <div className="flex-grow p-6">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`drawer-side shadow-lg transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <label
            htmlFor="my-drawer-4"
            className="drawer-overlay lg:hidden"
            onClick={toggleDrawer}
          ></label>
          <div className="flex min-h-full flex-col items-start bg-white w-64 border-r border-gray-200">
            <Logo />
            <ul className="menu w-full grow p-4 space-y-2">
              {/* Home */}
              <li>
                <Link
                  to={"/dashboard"}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  onClick={() => setDrawerOpen(false)}
                >
                  <HomeIcon className="h-6 w-6 text-blue-500" />
                  <span>Homepage</span>
                </Link>
              </li>

              {/* Profile */}
              <li>
                <Link
                  to="/dashboard/profile"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  onClick={() => setDrawerOpen(false)}
                >
                  <UserIcon className="h-6 w-6 text-blue-500" />
                  <span>Profile</span>
                </Link>
              </li>

              {/* Add Lesson */}
              <li>
                <Link
                  to="/dashboard/add-lesson"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  onClick={() => setDrawerOpen(false)}
                >
                  <PlusCircleIcon className="h-6 w-6 text-blue-500" />
                  <span>Add Lesson</span>
                </Link>
              </li>

              {/* My Lessons */}
              <li>
                <Link
                  to="/dashboard/my-lessons"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  onClick={() => setDrawerOpen(false)}
                >
                  <BookOpenIcon className="h-6 w-6 text-blue-500" />
                  <span>My Lessons</span>
                </Link>
              </li>

              {/* Pricing */}
              <li>
                <Link
                  to="/dashboard/pricing"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  onClick={() => setDrawerOpen(false)}
                >
                  <CurrencyDollarIcon className="h-6 w-6 text-blue-500" />
                  <span>Pricing</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
