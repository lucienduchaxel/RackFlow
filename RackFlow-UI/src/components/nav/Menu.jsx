import { ChevronFirst, ChevronLast, ChevronDown } from "lucide-react";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";
import { createContext, useContext, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { Link as RouterLink } from "react-router-dom";

const SidebarContext = createContext();

export default function Menu({ children }) {
  const [expanded, setExpanded] = useState(true);
  const { user } = useUser();
  const [dark, setDark] = useState(false);
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white dark:bg-slate-800">
        {/* Logo and Toggle */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Sidebar Items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 overflow-auto">{children}</ul>
        </SidebarContext.Provider>

        {/* Profile and Settings */}
        <div className="border-t flex p-3 items-center">
          <div
            className={`overflow-hidden transition-all ${
              expanded ? "w-40 ml-3" : "w-0"
            }`}
          >
            <h4 className="font-semibold dark:text-white">{user?.username}</h4>
            <button
              onClick={darkModeHandler}
              className={`rounded-md border-2 p-2 dark:bg-slate-800 dark:text-white `}
            >
              Dark
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function MenuItem({ icon, text, link, onClick }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li>
      <RouterLink
        to={link || "#"} // Use react-router-dom's Link for navigation
        onClick={onClick}
        className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors hover:bg-indigo-50 dark:hover:bg-slate-700 dark:text-white`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-40 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
      </RouterLink>
    </li>
  );
}

export function MenuDropdown({ icon, text, children }) {
  const { expanded } = useContext(SidebarContext);
  const [open, setOpen] = useState(false);

  return (
    <li className="relative">
      <div
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
          open
            ? "bg-gray-100 dark:bg-gray-700"
            : "hover:bg-indigo-50 dark:hover:bg-slate-700"
        } ${expanded ? "justify-between" : "justify-center"}`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center">
          {icon}
          <span
            className={`overflow-hidden transition-all dark:text-white ${
              expanded ? "w-40 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
        </div>
        <ChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""} ${
            expanded ? "" : "hidden"
          }`}
        />
      </div>

      {open && (
        <ul className="relative ml-6">
          {/* <span
              className="absolute left-[-20px] top-[8px] w-6 h-12 border-l-2 border-t-2 border-gray-300 dark:border-gray-600 rounded-tl-lg"
              style={{
                borderTopLeftRadius: "8px",
              }}
            /> */}
          {children}
        </ul>
      )}
    </li>
  );
}
