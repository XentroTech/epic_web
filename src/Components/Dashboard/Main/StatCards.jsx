import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

function StatCards() {
  return (
    <>
      <Card
        title="Gross Revenue"
        value="$120,054.24"
        pillText="2.75%"
        trend="up"
        period="From Jan 1st - Jul 31st"
      />
      <Card
        title="Avg Sells"
        value="$27,97"
        pillText="1.01%"
        trend="down"
        period="From Jan 1st - Jul 31st"
      />
      <Card
        title="Trailing Year"
        value="$278,854.24"
        pillText="60.75%"
        trend="up"
        period="Previous 365 days"
      />
    </>
  );
}

const Card = ({ title, value, pillText, trend, period }) => {
  return (
    <div className="col-span-4  p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className=" flex items-start text-stone-500 mb-2 text-sm">
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
        {pillText}
      </div>
      <p className="text-xs flex items-start text-stone-500">{period}</p>
    </div>
  );
};

export default StatCards;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   useGetCoinRevenueQuery,
//   useGetImageRevenueQuery,
//   useGetSpaceRevenueQuery,
// } from "../../../features/dashboardStat/revenueApi";
// import {
//   setCoinTotals,
//   setImageTotals,
//   setSpaceTotals,
// } from "../../../features/dashboardStat/totalSlice";

// function DashboardStats() {
//   const [interval, setInterval] = useState("daily");

//   const dispatch = useDispatch();

//   // Fetch data
//   const { data: coinData, refetch: refetchCoin } =
//     useGetCoinRevenueQuery(interval);
//   const { data: imageData, refetch: refetchImage } =
//     useGetImageRevenueQuery(interval);
//   const { data: spaceData, refetch: refetchSpace } =
//     useGetSpaceRevenueQuery(interval);

//   // Totals from Redux
//   const totals = useSelector((state) => state.totals);

//   useEffect(() => {
//     // Refetch data when the interval changes
//     refetchCoin();
//     refetchImage();
//     refetchSpace();
//   }, [interval]);

//   useEffect(() => {
//     // Update Redux state when data changes
//     if (coinData?.totals) {
//       dispatch(
//         setCoinTotals({
//           count: coinData.totals.totalCount,
//           earnings: coinData.totals.totalEarnings,
//         })
//       );
//     }

//     if (imageData?.totals) {
//       dispatch(
//         setImageTotals({
//           count: imageData.totals.totalCount,
//           earnings: imageData.totals.totalEarnings,
//         })
//       );
//     }

//     if (spaceData?.totals) {
//       dispatch(
//         setSpaceTotals({
//           count: spaceData.totals.totalCount,
//           earnings: spaceData.totals.totalEarnings,
//         })
//       );
//     }
//   }, [coinData, imageData, spaceData, dispatch]);

//   return (
//     <div>
//       {/* Interval Buttons */}
//       <div className="mt-4">
//         {["daily", "weekly", "monthly", "yearly"].map((type) => (
//           <button
//             key={type}
//             className={`px-4 py-1 mr-2 ${
//               interval === type ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setInterval(type)}
//           >
//             {type.charAt(0).toUpperCase() + type.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Totals Flex Boxes */}
//       <div className="mt-4 grid grid-cols-3 gap-4">
//         <div className="p-4 border rounded bg-gray-100">
//           <h3 className="font-medium">Coin</h3>
//           <p>Total Count: {totals.coin.count}</p>
//           <p>Total Earnings: ${totals.coin.earnings}</p>
//         </div>
//         <div className="p-4 border rounded bg-gray-100">
//           <h3 className="font-medium">Image</h3>
//           <p>Total Count: {totals.image.count}</p>
//           <p>Total Earnings: ${totals.image.earnings}</p>
//         </div>
//         <div className="p-4 border rounded bg-gray-100">
//           <h3 className="font-medium">Space</h3>
//           <p>Total Count: {totals.space.count}</p>
//           <p>Total Earnings: ${totals.space.earnings}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardStats;
