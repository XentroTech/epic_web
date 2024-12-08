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
} from "../../../features/dashboardStat/revenueApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setImageTotals,
  setSpaceTotals,
} from "../../../features/dashboardStat/totalSlice";

function ImageSpaceGraph() {
  const [interval, setInterval] = useState("daily");

  // Fetch data for image and space revenues
  const { data: imageData, refetch: refetchImage } =
    useGetImageRevenueQuery(interval);
  const { data: spaceData, refetch: refetchSpace } =
    useGetSpaceRevenueQuery(interval);
  const dispatch = useDispatch();
  useEffect(() => {
    // Refetch data when the interval changes
    refetchImage();
    refetchSpace();
  }, [interval]);

  useEffect(() => {
    // Update Redux state when data changes

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
        <div className="mt-2">
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
              interval === "weekly" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setInterval("weekly")}
          >
            Weekly
          </button>
          <button
            className={`px-4 py-1 mr-2 ${
              interval === "monthly" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setInterval("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-1 mr-2 ${
              interval === "yearly" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setInterval("yearly")}
          >
            Yearly
          </button>
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
