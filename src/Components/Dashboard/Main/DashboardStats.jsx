import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCoinRevenueQuery,
  useGetImageRevenueQuery,
  useGetSpaceRevenueQuery,
} from "../../../features/dashboardStat/revenueApi";
import {
  setCoinTotals,
  setImageTotals,
  setSpaceTotals,
} from "../../../features/dashboardStat/totalSlice";
import StatCards from "./StatCards";

function DashboardStats() {
  const [interval, setInterval] = useState("daily");

  const dispatch = useDispatch();

  // Fetch data
  const { data: coinData, refetch: refetchCoin } =
    useGetCoinRevenueQuery(interval);
  const { data: imageData, refetch: refetchImage } =
    useGetImageRevenueQuery(interval);
  const { data: spaceData, refetch: refetchSpace } =
    useGetSpaceRevenueQuery(interval);
  const coin = coinData?.totals || [];
  console.log(coinData?.totals || "nothing");
  console.log(coin);

  useEffect(() => {
    // Refetch data when the interval changes
    refetchCoin();
    refetchImage();
    refetchSpace();
  }, [interval]);

  useEffect(() => {
    // Update Redux state when data changes
    if (coin) {
      dispatch(
        setCoinTotals({
          count: coin.totalCount,
          earnings: coin.totalEarnings,
          amount: coin.totalAmount,
        })
      );
    }

    if (imageData?.totals) {
      dispatch(
        setImageTotals({
          count: imageData.totals.totalCount,
          earnings: imageData.totals.totalEarnings,
        })
      );
    }

    if (spaceData?.totals) {
      dispatch(
        setSpaceTotals({
          count: spaceData.totals.totalCount,
          earnings: spaceData.totals.totalEarnings,
        })
      );
    }
  }, [coinData, imageData, spaceData, dispatch]);

  return (
    <div>
      {/* Interval Buttons */}
      <div className="mt-4">
        {["daily", "weekly", "monthly", "yearly"].map((type) => (
          <button
            key={type}
            className={`px-4 py-1 mr-2 ${
              interval === type ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setInterval(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <StatCards
          coin={totals.coin}
          image={totals.image}
          space={totals.space}
        />
      </div>
    </div>
  );
}

export default DashboardStats;
