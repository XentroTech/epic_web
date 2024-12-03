import CoinRevenueGraph from "./CoinRevenueGraph";
import ImageSpaceGraph from "./ImageSpaceGraph";
import StatCards from "./StatCards";

function Grid() {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatCards />
      <CoinRevenueGraph />
      <ImageSpaceGraph />
    </div>
  );
}

export default Grid;
