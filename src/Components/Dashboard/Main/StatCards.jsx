import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { useSelector } from "react-redux";
import convertCoins from "../../../utils/converter";

function StatCards() {
  // Totals from Redux
  const totals = useSelector((state) => state.totals);
  const { user } = useSelector((state) => state.auth);
  const { coin, image, space } = totals;
  const coinRevenue = convertCoins(coin.amount);
  const imageRevenue = convertCoins(image.earnings);
  const spaceRevenue = convertCoins(space.earnings);
  //revenue details
  const revenueDetails = (user, revenue, type) => {
    if (user.role === "superadmin") {
      if (type.country === "BD") {
        return revenue.bdt;
      } else {
        return revenue.myr;
      }
    } else if (user.role === "admin") {
      if (user.country === "BD") {
        return revenue.bdt;
      } else if (user.country === "MY") {
        return revenue.myr;
      }
    }
  };
  //currency sign
  const currencySign = (user, type) => {
    if (user.role === "superadmin") {
      if (type.country === "BD") {
        return "BDT";
      } else if (type.country === "MY") {
        return "MY";
      }
    } else if (user.role === "admin") {
      if (user.country === "BD") {
        return "BDT";
      } else if (user.country === "MY") {
        return "MY";
      }
    }
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <Card
        title="Coin Revenue"
        value={`${coin?.amount} coins`}
        revenue={`${revenueDetails(user, coinRevenue, coin)} ${currencySign(
          user,
          coin
        )}`}
        pillText="2.75%"
        trend={coin?.amount > 0 ? "up" : "down"}
      />
      <Card
        title="Image Revenue"
        value={`${image?.earnings} coins`}
        revenue={`${revenueDetails(user, imageRevenue, image)} ${currencySign(
          user,
          image
        )}`}
        pillText="1.01%"
        trend={image?.earnings > 0 ? "up" : "down"}
      />
      <Card
        title="Space Revenue"
        value={`${space?.earnings} coins`}
        revenue={`${revenueDetails(user, spaceRevenue, space)} 
         ${currencySign(user, space)}`}
        pillText="60.75%"
        trend={space?.earnings > 0 ? "up" : "down"}
      />
    </div>
  );
}

const Card = ({ title, value, revenue, pillText, trend }) => {
  return (
    <div className="p-4 rounded border border-stone-300">
      <div className="flex mb-4 items-start justify-between">
        <div>
          <h3 className="text-sm text-stone-500 mb-2">{title}</h3>
          <p className=" text-md text-stone-500">{value}</p>
          <p className="text-xl font-semibold">{revenue}</p>
        </div>
        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
        </span>
      </div>
      <p className="text-xs text-stone-500">{pillText}</p>
    </div>
  );
};

export default StatCards;
