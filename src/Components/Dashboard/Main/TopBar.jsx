import { useSelector } from "react-redux";
import AccountToggle from "./AccountToggle";

const formatDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  const day = date.getDate();
  const ordinalSuffix = (day) => {
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return formattedDate.replace(/\d+/, day);
};

function TopBar() {
  const { user } = useSelector((state) => state.auth);
  const currentDate = new Date();

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">Welcome, {user.role}</span>
          <span className="text-xs block text-stone-500">
            <p>{formatDate(currentDate)}</p>
          </span>
        </div>
        <div>
          <AccountToggle />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
