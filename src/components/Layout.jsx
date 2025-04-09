import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import logo from "@/assets/DRG_Icon.png";
import {
  HomeIcon,
  MapIcon,
  ClipboardDocumentListIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "@/contexts/SidebarContext";

function Layout() {
  const { isOpen, toggleSidebar } = useSidebar();
  const { user } = useUser();
  const { signOut } = useClerk();
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/home", icon: HomeIcon },
    { name: "Projects", href: "/projects", icon: ClipboardDocumentListIcon },
    { name: "New Project", href: "/projects/new", icon: MapIcon },
  ];

  return (
    <div className="min-h-screen h-full bg-[#8C969C]">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#8C969C] transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-center space-x-2 px-4 py-6">
            <img src={logo} alt="DRG Icon" className="h-10 w-10" />
            <h2 className="text-xl font-bold text-white">GeogriFact</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-white text-[#8C969C]"
                      : "hover:bg-white text-white hover:text-[#8C969C]"
                  }`}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User menu */}
          <div className="border-t border-base-300 p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
              <button
                onClick={() => signOut()}
                className="btn btn-sm btn-ghost text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden bg-base-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2">
          <button onClick={() => toggleSidebar()}>
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Archaeological Survey</h1>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`${
          isOpen ? "md:pl-64" : "md:pl-0"
        } transition-all duration-200 ease-in-out`}
      >
        <main className="p-6 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
