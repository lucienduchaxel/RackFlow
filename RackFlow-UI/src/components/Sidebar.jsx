import {
  ChevronFirst,
  ChevronLast,
  MoreVertical,
  HomeIcon,
  LayoutDashboard,
} from "lucide-react";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import { createContext, useContext, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import Menu, { MenuItem, MenuDropdown } from "./nav/Menu";

const SidebarContext = createContext();

export default function Sidebar() {
  const { logout } = useUser();

  return (
    <Menu>
      <MenuDropdown
        icon={<HomeIcon size={20} />}
        text="Favorites"
      ></MenuDropdown>
      <MenuDropdown icon={<HomeIcon size={20} />} text="Stock">
        <MenuItem
          icon={<LayoutDashboard size={20} />}
          text="Inventory"
          link="/inventory"
        />
        <MenuItem icon={<HomeIcon size={16} />} text="Inventory Adjustment" />
      </MenuDropdown>
      <MenuDropdown icon={<HomeIcon size={20} />} text="Maintenance">
        <MenuItem
          icon={<LayoutDashboard size={20} />}
          text="Locations"
          link="/locations"
        />
        <MenuItem
          icon={<LayoutDashboard size={20} />}
          text="Items"
          link="/items"
        />
      </MenuDropdown>
      <MenuDropdown icon={<HomeIcon size={20} />} text="Administration">
        <MenuItem
          icon={<LayoutDashboard size={20} />}
          text="Users"
          link="/users"
        />
      </MenuDropdown>

      <MenuItem icon={<HomeIcon size={20} />} text="Dashboard" link="/" />

      <Link onClick={logout}>
        <MenuItem
          icon={<LayoutDashboard size={20} />}
          text="Logout"
          link="/inventory"
        />
      </Link>
    </Menu>
  );
}
