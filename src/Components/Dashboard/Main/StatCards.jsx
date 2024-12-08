import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { useSelector } from "react-redux";

function StatCards() {
  // Totals from Redux
  const totals = useSelector((state) => state.totals);
  const { user } = useSelector((state) => state.auth);
  const { coin, image, space } = totals;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <Card
        title="Coin Revenue"
        value={`${coin?.earnings} ${user.country === "BD" ? "BDT" : "MYR"}`}
        pillText="2.75%"
        trend={coin?.earnings > 0 ? "up" : "down"}
      />
      <Card
        title="Image Revenue"
        value={`${image?.earnings} ${user.country === "BD" ? "BDT" : "MYR"}`}
        pillText="1.01%"
        trend={image?.earnings > 0 ? "up" : "down"}
      />
      <Card
        title="Space Revenue"
        value={`${space?.earnings} ${user.country === "BD" ? "BDT" : "MYR"}`}
        pillText="60.75%"
        trend={space?.earnings > 0 ? "up" : "down"}
      />
    </div>
  );
}

const Card = ({ title, value, pillText, trend }) => {
  return (
    <div className="p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="flex items-start text-stone-500 mb-2 text-sm">
            {title}
          </h3>
          <p className="text-3xl font-semibold">{value}</p>
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
