import React, { useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  useGetImageRevenueQuery,
  useGetSpaceRevenueQuery,
  useGetYearsQuery,
} from "../../../features/dashboardStat/revenueApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setImageTotals,
  setSpaceTotals,
} from "../../../features/dashboardStat/totalSlice";

function ImageSpaceGraph() {
  const [interval, setInterval] = useState("daily");
  const [country, setCountry] = useState("BD");
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [availableYear, setAvailableYear] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  // Fetch data for image and space revenues
  const { data: imageData, refetch: refetchImage } = useGetImageRevenueQuery({
    interval,
    country,
    year,
  });
  const { data: spaceData, refetch: refetchSpace } = useGetSpaceRevenueQuery({
    interval,
    country,
    year,
  });
  const { data: years } = useGetYearsQuery();
  const allYears = years ? years : [];
  const dispatch = useDispatch();
  useEffect(() => {
    // Refetch data when the interval or country changes
    setAvailableYear(allYears.totalYears);
    refetchImage();
    refetchSpace();
  }, [interval, country, year]);

  useEffect(() => {
    // Update Redux state when data changes

    if (imageData?.totals) {
      dispatch(
        setImageTotals({
          count: imageData.totals.totalCount,
          earnings: imageData.totals.totalEarnings,
          country: country,
        })
      );
    }

    if (spaceData?.totals) {
      dispatch(
        setSpaceTotals({
          count: spaceData.totals.totalCount,
          earnings: spaceData.totals.totalEarnings,
          country: country,
        })
      );
    }
  }, [imageData, spaceData, dispatch]);

  // Combine and process the data
  const processChartData = (imageData, spaceData, interval) => {
    const imageChartData = imageData?.chartData || [];
    const spaceChartData = spaceData?.chartData || [];

    const mergedData = imageChartData.map((imageItem, index) => {
      const spaceItem = spaceChartData[index] || {};
      return {
        name:
          interval === "yearly"
            ? imageItem.month
            : interval === "monthly"
            ? `Day ${imageItem.day}`
            : interval === "daily"
            ? imageItem.hour
            : imageItem.day,
        imageEarnings: imageItem.totalEarnings || 0,
        spaceEarnings: spaceItem.totalEarnings || 0,
      };
    });

    return mergedData;
  };

  const chartData = processChartData(imageData, spaceData, interval);

  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiImage /> Image and Space Revenue
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
          <div className="flex justify-center items-center gap-8">
            <div className="country">
              {currentUser?.role === "superadmin" ? (
                <div className="div w-[60px]">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="border rounded-md p-1 w-[80px] h-[50px] focus:outline-none focus:ring focus:border-green-400"
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
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="imageEarnings" fill="#8884d8" name="Image Earnings" />
            <Bar dataKey="spaceEarnings" fill="#82ca9d" name="Space Earnings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ImageSpaceGraph;
