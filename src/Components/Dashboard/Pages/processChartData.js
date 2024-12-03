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
