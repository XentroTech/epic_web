import React from "react";

const TipsAndTricks = () => {
  const tips = [
    {
      category: "User Registration and Authentication",
      items: [
        "Use a strong and unique password for your account to ensure security.",
        "Complete account verification promptly to access all platform features.",
        "Use a valid phone number and email address for seamless communication and recovery options.",
      ],
    },
    {
      category: "Wallet and Payment System",
      items: [
        "Top-up in bulk to save time and ensure you have enough Picoins for future purchases or competitions.",
        "Keep track of your Picoins balance to avoid running out during critical moments, like competition deadlines.",
        "Watch ads to earn free Picoins, especially if you’re short on funds.",
      ],
    },
    {
      category: "Photo Marketplace",
      items: [
        "Organize your photos into categories to attract more buyers.",
        "Focus on high-quality, eye-catching images that fit popular themes (nature, travel, etc.) to increase sales potential.",
        "Regularly update your photo gallery to keep your content fresh and engaging for buyers.",
      ],
    },
    {
      category: "Competitions",
      items: [
        "For daily competitions, buy photos early in the day to ensure your entries are included in the draw.",
        "For weekly competitions, upload your photo as soon as the theme is announced to maximize social media exposure.",
        "Use creative and visually striking photos for weekly competitions to gather more likes.",
        "Share your competition photo across multiple social media platforms to reach a wider audience.",
      ],
    },
    {
      category: "Content Moderation and Rules",
      items: [
        "Familiarize yourself with the platform’s content rules to avoid warnings or account suspension.",
        "Avoid controversial or sensitive themes to ensure your uploads pass moderation quickly.",
        "If flagged, review your photo and make appropriate changes before re-uploading.",
      ],
    },
    {
      category: "Leaderboard and Analytics",
      items: [
        "Monitor your personal stats and use them to identify areas for improvement, whether in photo quality or competition strategy.",
        "Photographers should analyze sales trends to identify which photo categories are performing best.",
      ],
    },
    {
      category: "Advertisement and Sponsorships",
      items: [
        "Watch as many ads as possible when you have free time to build up your Picoins balance.",
        "Keep an eye out for sponsored competitions, which often have higher rewards.",
      ],
    },
    {
      category: "Paid Gallery and Art Showcase",
      items: [
        "Upgrade to a paid gallery if you’re running out of free upload slots and want to continue showcasing and selling photos.",
        "Use compelling descriptions and pricing for your art to make it stand out in the marketplace.",
      ],
    },
    {
      category: "Device Optimization",
      items: [
        "Use a stable internet connection for smooth uploads and competition participation.",
        "Update your app or browser regularly to ensure you have the latest features and performance enhancements.",
        "Enable push notifications to stay informed about competition deadlines and announcements.",
      ],
    },
    {
      category: "General Tips",
      items: [
        "Stay active on the platform by frequently uploading photos, participating in competitions, and engaging with other users.",
        "Follow platform updates and announcements to take advantage of new features or promotions.",
        "If you encounter issues, don’t hesitate to contact support for help.",
      ],
    },
  ];

  return (
    <div className="p-6  text-gray-800 max-w-4xl mx-auto">
      <h1 className="text-4xl py-8 font-bold mb-6 text-center text-green-600">
        Tips and Tricks
      </h1>
      <div className="space-y-6">
        {tips.map((tip, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-3 text-green-600">
              {tip.category}
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              {tip.items.map((item, idx) => (
                <li key={idx} className="text-gray-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsAndTricks;
