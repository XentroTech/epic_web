import {
  FiDollarSign,
  FiHome,
  FiImage,
  FiLink,
  FiPlay,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
// Rename the Route component to avoid conflict with react-router-dom's Route component
function RouteSelect() {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-4 ">
      <Link to="/dashboard/main">
        <NavItem
          Icon={FiHome}
          selected={location.pathname === "/dashboard/main"}
          title="Dashboard"
        />
      </Link>
      <Link to="/dashboard/user">
        <NavItem
          Icon={FiUser}
          selected={location.pathname === "/dashboard/user"}
          title="User Management"
        />
      </Link>
      <Link to="/dashboard/images">
        <NavItem
          Icon={FiImage}
          selected={location.pathname === "/dashboard/images"}
          title="Image Management"
        />
      </Link>
      <Link to="/dashboard/games">
        <NavItem
          Icon={FiPlay}
          selected={location.pathname === "/dashboard/games"}
          title="Game Management"
        />
      </Link>
      <Link to="/dashboard/integration">
        <NavItem
          Icon={FiLink}
          selected={location.pathname === "/dashboard/integration"}
          title="Integration"
        />
      </Link>
      <Link to="/dashboard/finance">
        <NavItem
          Icon={FiDollarSign}
          selected={location.pathname === "/dashboard/finance"}
          title="Finance"
        />
      </Link>
    </div>
  );
}

export default RouteSelect;

// Rename this component to NavItem to avoid conflict with React Router's Route
const NavItem = ({ selected, Icon, title }) => {
  return (
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-700 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-green-500" : ""} />
      <span>{title}</span>
    </button>
  );
};