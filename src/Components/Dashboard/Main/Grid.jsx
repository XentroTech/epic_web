import CoinRevenueGraph from "./CoinRevenueGraph";
import ImageSpaceGraph from "./ImageSpaceGraph";
import StatCards from "./StatCards";

function Grid() {
  return (
    <div className="container mx-auto px-4">
      {/* First Row: StatCards */}
      <div className="grid gap-4 grid-cols-1">
        <div>
          <StatCards />
        </div>
      </div>

      {/* Second Row: Graphs */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
        <div>
          <CoinRevenueGraph />
        </div>
        <div>
          <ImageSpaceGraph />
        </div>
      </div>
    </div>
  );
}

export default Grid;
