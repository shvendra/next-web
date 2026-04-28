"use client";

import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";

interface MobileHeaderLinkProps {
  item: HeaderItem;
  closeMenu: () => void;
}

const MobileHeaderLink: React.FC<MobileHeaderLinkProps> = ({ item, closeMenu }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();

  const handleToggle = (e: React.MouseEvent) => {
    if (item.submenu) {
      // If it has a submenu, don't navigate, just open/close the list
      e.preventDefault();
      setSubmenuOpen(!submenuOpen);
    } else {
      // If it's a direct link, navigate and hide the whole menu
      closeMenu();
    }
  };

  // Logic for active path highlighting
  let navString = "";
  const counterLetter = item.label.slice(-1);
  if (counterLetter === "s") {
    navString = item.label.toLowerCase().substring(0, item.label.length - 1);
  } else {
    navString = item.label.toLowerCase();
  }

  const isActive = path === item.href || path.startsWith(`/${navString}`);

  return (
    <div className="relative w-full">
      <Link
        href={item.href}
        onClick={handleToggle}
        className={`flex items-center justify-between w-full py-2 px-3 rounded-md transition-colors focus:outline-none ${
          isActive 
            ? "bg-primary text-white" 
            : "text-black dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5"
        }`}
      >
        {item.label}
        {item.submenu && (
          <svg
            className={`transition-transform duration-200 ${submenuOpen ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>

      {submenuOpen && item.submenu && (
        <div className="mt-1 flex flex-col space-y-1 pl-4 border-l border-gray-200 dark:border-gray-700 ml-3">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              onClick={closeMenu} // Close main menu on sub-item click
              className={`block py-2 px-3 text-sm rounded-md transition-colors ${
                path === subItem.href 
                  ? "text-primary font-bold" 
                  : "text-gray-500 hover:text-primary dark:text-gray-400"
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;