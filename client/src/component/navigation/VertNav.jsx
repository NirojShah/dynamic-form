import React from "react";
import {
  LayoutDashboard,
  Share2,
  FileText,
  BarChart3,
  Folder,
  Archive,
  Settings,
  Plug,
  UserCircle,
  LucideSquareCenterlineDashedHorizontal,
  Heart
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const VertNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const workSpaceMenu = [
    { name: "My Forms", icon: <LayoutDashboard size={18} />, path: "/home" },
    {
      name: "Shared with me",
      icon: <Share2 size={18} />,
      path: "/home/shared",
    },
    {
      name: "Templates",
      icon: <FileText size={18} />,
      path: "/home/templates",
    },
    {
      name: "Analytics",
      icon: <BarChart3 size={18} />,
      path: "/home/analytics",
    },
  ];

  const foldersMenu = [
    { name: "Client Work", icon: <LucideSquareCenterlineDashedHorizontal size={18} />, path: "/home/client" },
    { name: "Favourite", icon: <Heart size={18} />, path: "/home/favorites" },
    { name: "Surveys", icon: <Folder size={18} />, path: "/home/surveys" },
    { name: "Archive", icon: <Archive size={18} />, path: "/home/archive" },
  ];

  const accountsMenu = [
    {
      name: "Integrations",
      icon: <Plug size={18} />,
      path: "/home/integrations",
    },
    { name: "Settings", icon: <Settings size={18} />, path: "/home/settings" },
    { name: "Create User", icon: <UserCircle />, path: "/new-user" }
  ];
  const renderMenu = (menu) =>
    menu.map((item, i) => (
      <div
        key={i}
        onClick={() => navigate(item.path)}
        title={item.name} // 👈 tooltip for mobile
        className={`
          flex items-center gap-3 
          px-4 py-2.5 cursor-pointer rounded-lg mx-2
          transition-all duration-200 my-[4px]

          ${isActive(item.path)
            ? "bg-[#9FE870]/20 text-[#163300]"
            : "text-[#1e1f1e] hover:bg-black/5"
          }
        `}
      >
        {/* ICON */}
        <div>{item.icon}</div>

        {/* TEXT */}
        <span className="hidden md:block text-sm font-medium">{item.name}</span>
      </div>
    ));

  return (
    <div
      className="
        h-full 
        border-r border-black/10 
        bg-white 
        flex flex-col
        transition-all duration-300

        w-16 md:w-64
      "
    >
      {/* WORKSPACE */}
      <div className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:block">
        Workspace
      </div>
      {renderMenu(workSpaceMenu)}

      {/* FOLDERS */}
      <div className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:block mt-4">
        Folders
      </div>
      {renderMenu(foldersMenu)}

      {/* ACCOUNT */}
      <div className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:block mt-4">
        Account
      </div>
      {renderMenu(accountsMenu)}
    </div>
  );
};

export default VertNav;
