import React, { useEffect, useState } from "react";
import { FiCircle, FiUser } from "react-icons/fi";
import { FaCoins } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCoinRevenueQuery,
  useGetYearsQuery,
} from "../../../features/dashboardStat/revenueApi";
import { setCoinTotals } from "../../../features/dashboardStat/totalSlice";

function CoinRevenueGraph() {
  const [loading, setLoading] = useState(false);
  const [interval, setInterval] = useState("daily");
  const [country, setCountry] = useState("BD");
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [availableYear, setAvailableYear] = useState([]);
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { data, refetch } = useGetCoinRevenueQuery({
    interval,
    country,
    year,
  });
  //get years
  const { data: years } = useGetYearsQuery();
  const allYears = years ? years : [];
  const chartData = data?.chartData || [];
  useEffect(() => {
    // Fetch data when the interval or  country changes
    setAvailableYear(allYears.totalYears);
    refetch();
  }, [interval, country, year]);
  useEffect(() => {
    // Update Redux state when data changes

    if (data?.totals) {
      dispatch(
        setCoinTotals({
          count: data.totals.totalCount,
          earnings: data.totals.totalEarnings,
          amount: data.totals.totalAmount,
          country: country,
        })
      );
    }
  }, [data, dispatch]);
  const processChartData = (chartData, interval) => {
    switch (interval) {
      case "yearly":
        return chartData.map((item) => ({
          name: item.month,
          count: item.count,
          earnings: item.totalEarnings,
        }));
      case "monthly":
        return chartData.map((item) => ({
          name: `Day ${item.day}`,
          count: item.count,
          earnings: item.totalEarnings,
        }));
      case "daily":
        return chartData.map((item) => ({
          name: item.hour,
          count: item.count,
          earnings: item.totalEarnings,
        }));
      case "weekly":
        return chartData.map((item) => ({
          name: item.day,
          count: item.count,
          earnings: item.totalEarnings,
        }));
      default:
        return [];
    }
  };

  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FaCoins /> Coin Revenue
        </h3>
        <div className="mt-2 flex justify-between items-center">
          <div className="div">
            <button
              className={`px-4 py-1 mr-2 ${
                interval === "daily" ? "bg-green-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setInterval("daily")}
            >
              Daily
            </button>
            <button
              className={`px-4 py-1 ${
                interval === "weekly"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setInterval("weekly")}
            >
              Weekly
            </button>
            <button
              className={`px-4 py-1 mr-2 ${
                interval === "monthly"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setInterval("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-1 mr-2 ${
                interval === "yearly"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setInterval("yearly")}
            >
              Yearly
            </button>
          </div>
          <div className="flex gap-4">
            <div className="country">
              {currentUser?.role === "superadmin" ? (
                <div className="div w-[60px]">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="border rounded-md p-1 w-[60px] h-[50px] focus:outline-none focus:ring focus:border-green-400"
                  >
                    <option value="BD">BD</option>
                    <option value="MY">MY</option>
                  </select>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="year">
              <div className="div w-[60px]">
                {/* {interval === "year" ? ( */}
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="border rounded-md p-1 w-[70px] h-[50px] focus:outline-none focus:ring focus:border-green-400"
                >
                  {availableYear &&
                    availableYear.map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-64 px-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={processChartData(chartData, interval)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey=" Coin earnings" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default CoinRevenueGraph;
