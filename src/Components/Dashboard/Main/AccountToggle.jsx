import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useSelector } from "react-redux";

function AccountToggle() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        {user?.profile_pic ? (
          <img
            src={user.profile_pic}
            alt="avatar"
            className="size-8 rounded-full shrink-0 bg-green-500 shadow"
          />
        ) : (
          <img
            src="https://api.dicebear.com/9.x/notionists/svg"
            alt="avatar"
            className="size-8 rounded-full shrink-0 bg-green-500 shadow"
          />
        )}
        <div className="text-start">
          <span className="text-sm font-bold block">{user.name}</span>
          <span className="text-xs block text-stone-500">{user.email}</span>
        </div>

        <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" />
        <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />
      </button>
    </div>
  );
}

export default AccountToggle;
