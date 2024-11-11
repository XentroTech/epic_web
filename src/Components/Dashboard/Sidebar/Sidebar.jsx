import AccountToggle from "../Main/AccountToggle";
import Search from "./Search";
import RouteSelect from "./RouteSelect";
import Logo from "./Logo";
function Sidebar() {
  return (
    <div>
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        <Logo />
        <Search />
        <RouteSelect />
      </div>
    </div>
  );
}

export default Sidebar;
